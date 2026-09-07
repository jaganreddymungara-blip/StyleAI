from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime

from app.database import (
    wardrobe_collection,
    recommendation_history_collection
)

from app.services.gemini_service import generate_styling_recommendation


router = APIRouter()


class StylistRequest(BaseModel):
    user_email: str
    occasion: str
    season: str
    style: str
    color: str = "Any"


@router.post("/generate")
async def generate_outfit(request: StylistRequest):

    try:
        # Get user's wardrobe
        clothes = []

        async for item in wardrobe_collection.find(
            {"user_email": request.user_email}
        ):
            item["_id"] = str(item["_id"])

            clothes.append(item)

        if not clothes:
            raise HTTPException(
                status_code=404,
                detail="Your wardrobe is empty. Add some clothes first."
            )

        # Prepare wardrobe information for Gemini
        wardrobe_text = "\n".join(
            [
                f"""
        ID: {item['_id']}
        Category: {item.get('category', '')}
        Brand: {item.get('brand', '')}
        Color: {item.get('color', '')}
        Description: {item.get('description', '')}
        Season: {item.get('season', '')}
        Occasion: {item.get('occasion', '')}
        """
                for item in clothes
            ]
        )

        prompt = f"""
You are StyleAI, a professional personal fashion stylist.

Create ONE complete outfit using ONLY clothing items
that exist in the user's wardrobe.

USER PREFERENCES

Occasion: {request.occasion}
Season: {request.season}
Style: {request.style}
Preferred Color: {request.color}

USER'S WARDROBE

{wardrobe_text}

IMPORTANT RULES

1. Only recommend items from the wardrobe.
2. Never invent clothing items.
3. Use the exact item IDs provided.
4. Create one complete outfit.
5. Consider color coordination.
6. Consider the requested occasion.
7. Consider the requested season.
8. Consider the requested style.
9. If the preferred color is "Any", choose the colors that work best together.
10. Avoid items that don't suit the requested occasion or season.
11. Use the item's exact ID.
12. If shoes are available and appropriate, include them.
13. Accessories are optional.

Return ONLY valid JSON using this exact structure:

{{
    "outfit": [
        {{
            "item_id": "EXACT_ID",
            "role": "top"
        }},
        {{
            "item_id": "EXACT_ID",
            "role": "bottom"
        }},
        {{
            "item_id": "EXACT_ID",
            "role": "shoes"
        }}
    ],
    "style": "short outfit name",
    "reason": "Explain why this outfit works in 2-3 sentences."
}}

Do not use markdown.
Return valid JSON only.
"""

        # Ask Gemini for recommendation
        recommendation = await generate_styling_recommendation(prompt)

        # Create lookup table for wardrobe items
        clothes_by_id = {
            item["_id"]: item
            for item in clothes
        }

        # Attach complete wardrobe data to Gemini's recommendation
        recommended_items = []

        for outfit_item in recommendation.get("outfit", []):

            item_id = outfit_item.get("item_id")
            role = outfit_item.get("role", "")

            wardrobe_item = clothes_by_id.get(item_id)

            if wardrobe_item:
                recommended_items.append({
                    "_id": wardrobe_item["_id"],
                    "image": wardrobe_item.get("image", ""),
                    "category": wardrobe_item.get("category", ""),
                    "brand": wardrobe_item.get("brand", ""),
                    "color": wardrobe_item.get("color", ""),
                    "season": wardrobe_item.get("season", ""),
                    "occasion": wardrobe_item.get("occasion", ""),
                    "role": role
                })

        # Make sure Gemini didn't return invalid item IDs
        if not recommended_items:
            raise HTTPException(
                status_code=500,
                detail="Gemini returned clothing items that were not found in the wardrobe."
            )
        # =====================================================
        # SAVE RECOMMENDATION TO HISTORY
        # =====================================================

        history_item = {
            "email": request.user_email,
            "outfit": recommended_items,
            "style": recommendation.get(
                "style",
                "Personalized Outfit"
            ),
            "reason": recommendation.get(
                "reason",
                "This outfit was selected from your wardrobe."
            ),
            "occasion": request.occasion,
            "season": request.season,
            "color": request.color,
            "created_at": datetime.utcnow(),
        }

        await recommendation_history_collection.insert_one(
            history_item
        )

        return {
            "success": True,
            "recommendation": {
                "outfit": recommended_items,
                "style": recommendation.get(
                    "style",
                    "Personalized Outfit"
                ),
                "reason": recommendation.get(
                    "reason",
                    "This outfit was selected from your wardrobe."
                )
            }
        }

    except HTTPException:
        raise

    except Exception as error:
        print("Stylist error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to generate outfit recommendation."
        )
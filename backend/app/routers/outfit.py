from datetime import datetime
from itertools import product

from fastapi import APIRouter, Depends, HTTPException

from app.database import (
    wardrobe_collection,
    profiles_collection,
    recommendation_history_collection
)
from app.utils.auth import get_current_user
from app.utils.outfit_engine import calculate_score
from app.utils.profile_rules import get_profile_bonus
from app.utils.style_rules import get_style_bonus

router = APIRouter()


@router.get("/recommend")
async def recommend_outfit(
    current_user=Depends(get_current_user)
):

    email = current_user["email"]
    print("Logged in email:", email)

    # Get user profile
    profile = await profiles_collection.find_one(
        {"email": email},
        {"_id": 0}
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="User profile not found"
        )

    # Get wardrobe items
    clothes = await wardrobe_collection.find(
        {"email": email}
    ).to_list(None)

    print("Clothes found:", clothes)

    # Separate clothing categories
    shirts = [
        item for item in clothes
        if item["category"].lower() == "shirt"
    ]

    pants = [
        item for item in clothes
        if item["category"].lower() == "pant"
    ]

    shoes = [
        item for item in clothes
        if item["category"].lower() == "shoe"
    ]

    print("Shirts:", len(shirts))
    print("Pants:", len(pants))
    print("Shoes:", len(shoes))

    if not shirts or not pants or not shoes:
        raise HTTPException(
            status_code=400,
            detail="Please add at least one shirt, one pant and one shoe."
        )

    best_score = -1
    best_outfit = None
    best_reasons = []

    # Try every possible combination
    for shirt, pant, shoe in product(shirts, pants, shoes):

        # Base score
        base_score, reasons = calculate_score(
            shirt,
            pant,
            shoe
        )

        reasons = reasons.copy()

        # Profile bonus
        profile_bonus, profile_reasons = get_profile_bonus(
            profile,
            shirt,
            pant,
            shoe
        )

        # Style bonus
        style_bonus, style_reasons = get_style_bonus(
            shirt,
            pant,
            shoe
        )

        total_score = (
            base_score
            + profile_bonus
            + style_bonus
        )

        reasons.extend(profile_reasons)
        reasons.extend(style_reasons)

        print("--------------------------------")
        print("Combination:")
        print(shirt["name"], "|", pant["name"], "|", shoe["name"])
        print("Base Score:", base_score)
        print("Profile Bonus:", profile_bonus)
        print("Style Bonus:", style_bonus)
        print("Final Score:", total_score)
        print("Reasons:", reasons)

        if total_score > best_score:
            best_score = total_score
            best_reasons = reasons

            best_outfit = {
                "shirt": shirt.copy(),
                "pant": pant.copy(),
                "shoe": shoe.copy()
            }

    # Remove MongoDB fields
    for item in best_outfit.values():
        item.pop("_id", None)
        item.pop("email", None)

    # Save recommendation history
    await recommendation_history_collection.insert_one(
        {
            "email": email,
            "score": best_score,
            "reasons": best_reasons,
            "recommended_outfit": best_outfit,
            "created_at": datetime.utcnow()
        }
    )

    return {
        "score": best_score,
        "reasons": best_reasons,
        "recommended_outfit": best_outfit
    }
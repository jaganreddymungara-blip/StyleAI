from fastapi import APIRouter, UploadFile, File, Form, Query
from app.database import wardrobe_collection
import os
import shutil
import uuid
from datetime import datetime
from pydantic import BaseModel
from bson import ObjectId

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


class ClothingUpdate(BaseModel):
    category: str
    brand: str
    color: str
    season: str
    occasion: str
    description: str = ""


# =========================================================
# UPLOAD CLOTHING
# =========================================================

@router.post("/upload")
async def upload_clothing(
    file: UploadFile = File(...),
    user_email: str = Form(...),
    category: str = Form(...),
    brand: str = Form(""),
    color: str = Form(...),
    season: str = Form(...),
    occasion: str = Form(...),
    description: str = Form("")
):
    extension = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"

    filepath = os.path.join(UPLOAD_FOLDER, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    clothing = {
        "user_email": user_email,
        "image": filename,
        "category": category,
        "brand": brand,
        "color": color,
        "season": season,
        "occasion": occasion,
        "description": description,
        "favorite": False,
        "created_at": datetime.utcnow(),
    }

    result = await wardrobe_collection.insert_one(clothing)

    return {
        "message": "Clothing uploaded successfully",
        "id": str(result.inserted_id),
        "filename": filename,
    }


# =========================================================
# GET USER'S WARDROBE
# =========================================================

@router.get("/")
async def get_wardrobe(
    user_email: str = Query(...)
):
    clothes = []

    async for item in wardrobe_collection.find(
        {"user_email": user_email}
    ).sort("created_at", -1):

        item["_id"] = str(item["_id"])
        clothes.append(item)

    return clothes


# =========================================================
# UPDATE CLOTHING
# =========================================================

@router.put("/{clothing_id}")
async def update_clothing(
    clothing_id: str,
    clothing: ClothingUpdate
):
    result = await wardrobe_collection.update_one(
        {"_id": ObjectId(clothing_id)},
        {
            "$set": {
                "category": clothing.category,
                "brand": clothing.brand,
                "color": clothing.color,
                "season": clothing.season,
                "occasion": clothing.occasion,
                "description": clothing.description,
            }
        }
    )

    if result.matched_count == 0:
        return {
            "message": "Clothing item not found"
        }

    return {
        "message": "Clothing updated successfully"
    }


# =========================================================
# DELETE CLOTHING
# =========================================================

@router.delete("/{item_id}")
async def delete_clothing(item_id: str):

    clothing = await wardrobe_collection.find_one(
        {"_id": ObjectId(item_id)}
    )

    if clothing is None:
        return {
            "message": "Item not found"
        }

    if "image" in clothing:

        image_path = os.path.join(
            UPLOAD_FOLDER,
            clothing["image"]
        )

        if os.path.exists(image_path):
            os.remove(image_path)

    await wardrobe_collection.delete_one(
        {"_id": ObjectId(item_id)}
    )

    return {
        "message": "Clothing deleted successfully"
    }


# =========================================================
# TOGGLE FAVORITE
# =========================================================

@router.patch("/{item_id}/favorite")
async def toggle_favorite(item_id: str):

    clothing = await wardrobe_collection.find_one(
        {"_id": ObjectId(item_id)}
    )

    if clothing is None:
        return {
            "message": "Item not found"
        }

    new_value = not clothing.get(
        "favorite",
        False
    )

    await wardrobe_collection.update_one(
        {"_id": ObjectId(item_id)},
        {
            "$set": {
                "favorite": new_value
            }
        }
    )

    return {
        "message": "Favorite updated",
        "favorite": new_value
    }
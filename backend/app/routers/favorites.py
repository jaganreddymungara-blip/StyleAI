from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from bson.errors import InvalidId

from app.database import favorites_collection
from app.models.favorite import FavoriteOutfit
from app.utils.auth import get_current_user

router = APIRouter()


@router.post("/")
async def save_favorite(
    outfit: FavoriteOutfit,
    current_user=Depends(get_current_user)
):
    data = outfit.model_dump()

    data["email"] = current_user["email"]

    result = await favorites_collection.insert_one(data)

    return {
        "message": "Favorite outfit saved successfully",
        "id": str(result.inserted_id)
    }


@router.get("/")
async def get_favorites(
    current_user=Depends(get_current_user)
):
    items = []

    async for item in favorites_collection.find(
        {"email": current_user["email"]}
    ):
        item["_id"] = str(item["_id"])
        item.pop("email", None)
        items.append(item)

    return items


@router.delete("/{favorite_id}")
async def delete_favorite(
    favorite_id: str,
    current_user=Depends(get_current_user)
):
    try:
        object_id = ObjectId(favorite_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid favorite ID"
        )

    result = await favorites_collection.delete_one(
        {
            "_id": object_id,
            "email": current_user["email"]
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Favorite outfit not found"
        )

    return {
        "message": "Favorite outfit deleted successfully"
    }
from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from bson.errors import InvalidId

from app.database import recommendation_history_collection
from app.utils.auth import get_current_user

router = APIRouter()


# Get all recommendation history
@router.get("/")
async def get_history(
    current_user=Depends(get_current_user)
):
    history = []

    async for item in recommendation_history_collection.find(
        {"email": current_user["email"]}
    ).sort("created_at", -1):

        item["_id"] = str(item["_id"])
        item.pop("email", None)

        history.append(item)

    return history


# Delete one history item
@router.delete("/{history_id}")
async def delete_history(
    history_id: str,
    current_user=Depends(get_current_user)
):
    try:
        object_id = ObjectId(history_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid history ID"
        )

    result = await recommendation_history_collection.delete_one(
        {
            "_id": object_id,
            "email": current_user["email"]
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="History not found"
        )

    return {
        "message": "History deleted successfully"
    }


# Delete all history
@router.delete("/")
async def clear_history(
    current_user=Depends(get_current_user)
):
    result = await recommendation_history_collection.delete_many(
        {
            "email": current_user["email"]
        }
    )

    return {
        "message": "History cleared successfully",
        "deleted": result.deleted_count
    }
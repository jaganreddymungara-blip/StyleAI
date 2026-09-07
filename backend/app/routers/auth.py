from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pwdlib import PasswordHash
from pydantic import BaseModel, Field

from app.models.user import UserRegister
from app.database import (
    users_collection,
    profiles_collection,
    wardrobe_collection,
    favorites_collection,
    recommendation_history_collection,
)
from app.utils.auth import create_access_token, get_current_user


router = APIRouter()

password_hash = PasswordHash.recommended()


# =========================================================
# PASSWORD CHANGE MODEL
# =========================================================

class ChangePasswordRequest(BaseModel):
    current_password: str = Field(min_length=1)
    new_password: str = Field(min_length=6)


# =========================================================
# REGISTER
# =========================================================

@router.post("/register")
async def register(user: UserRegister):

    existing = await users_collection.find_one(
        {
            "email": user.email
        }
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = password_hash.hash(
        user.password
    )

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
    }

    await users_collection.insert_one(
        new_user
    )

    return {
        "message": "User registered successfully"
    }


# =========================================================
# LOGIN
# =========================================================

@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends()
):

    db_user = await users_collection.find_one(
        {
            "email": form_data.username
        }
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not password_hash.verify(
        form_data.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": db_user["email"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "name": db_user.get("name", ""),
            "email": db_user.get("email", "")
        }
    }


# =========================================================
# CHANGE PASSWORD
# =========================================================

@router.put("/change-password")
async def change_password(
    password_data: ChangePasswordRequest,
    current_user=Depends(get_current_user)
):

    email = current_user["email"]

    db_user = await users_collection.find_one(
        {
            "email": email
        }
    )

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User account not found."
        )

    # -----------------------------------------------------
    # Verify current password
    # -----------------------------------------------------

    if not password_hash.verify(
        password_data.current_password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect."
        )

    # -----------------------------------------------------
    # Prevent same password
    # -----------------------------------------------------

    if password_hash.verify(
        password_data.new_password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="New password must be different from your current password."
        )

    # -----------------------------------------------------
    # Hash new password
    # -----------------------------------------------------

    new_hashed_password = password_hash.hash(
        password_data.new_password
    )

    # -----------------------------------------------------
    # Update password
    # -----------------------------------------------------

    await users_collection.update_one(
        {
            "email": email
        },
        {
            "$set": {
                "password": new_hashed_password
            }
        }
    )

    return {
        "message": "Password changed successfully."
    }


# =========================================================
# DELETE ACCOUNT
# =========================================================

@router.delete("/account")
async def delete_account(
    current_user=Depends(get_current_user)
):

    email = current_user["email"]

    # -----------------------------------------------------
    # Check user exists
    # -----------------------------------------------------

    db_user = await users_collection.find_one(
        {
            "email": email
        }
    )

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User account not found."
        )

    # -----------------------------------------------------
    # Get profile so we can remove profile photo
    # -----------------------------------------------------

    profile = await profiles_collection.find_one(
        {
            "email": email
        }
    )

    if profile:

        profile_photo = profile.get(
            "profile_photo"
        )

        if profile_photo:

            from pathlib import Path

            photo_path = (
                Path("app/uploads") /
                profile_photo
            )

            if photo_path.exists():

                try:
                    photo_path.unlink()
                except OSError:
                    pass

    # -----------------------------------------------------
    # Delete user data
    # -----------------------------------------------------

    await profiles_collection.delete_many(
        {
            "email": email
        }
    )

    await wardrobe_collection.delete_many(
        {
            "email": email
        }
    )

    await favorites_collection.delete_many(
        {
            "email": email
        }
    )

    await recommendation_history_collection.delete_many(
        {
            "email": email
        }
    )

    # -----------------------------------------------------
    # Delete user account
    # -----------------------------------------------------

    result = await users_collection.delete_one(
        {
            "email": email
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=500,
            detail="Unable to delete account."
        )

    return {
        "message": "Account deleted successfully."
    }
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from pathlib import Path
import uuid

from app.models.profile import UserProfile
from app.database import profiles_collection
from app.utils.auth import get_current_user


router = APIRouter()


# =========================================================
# PROFILE PHOTO DIRECTORY
# =========================================================

PROFILE_UPLOAD_DIR = Path("app/uploads/profile")

PROFILE_UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True
)


# =========================================================
# ALLOWED IMAGE TYPES
# =========================================================

ALLOWED_IMAGE_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


# =========================================================
# CREATE PROFILE
# =========================================================

@router.post("/")
async def create_profile(
    profile: UserProfile,
    current_user=Depends(get_current_user)
):

    existing_profile = await profiles_collection.find_one(
        {
            "email": current_user["email"]
        }
    )

    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists"
        )

    profile_data = profile.model_dump(
        exclude_none=True
    )

    profile_data["email"] = current_user["email"]

    await profiles_collection.insert_one(
        profile_data
    )

    return {
        "message": "Profile created successfully"
    }


# =========================================================
# GET PROFILE
# =========================================================

@router.get("/")
async def get_profile(
    current_user=Depends(get_current_user)
):

    profile = await profiles_collection.find_one(
        {
            "email": current_user["email"]
        },
        {
            "_id": 0
        }
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile


# =========================================================
# UPDATE PROFILE
# =========================================================

@router.put("/")
async def update_profile(
    profile: UserProfile,
    current_user=Depends(get_current_user)
):

    profile_data = profile.model_dump(
        exclude_none=True
    )

    # Do not allow the normal profile update
    # to accidentally remove the profile photo.
    profile_data.pop(
        "profile_photo",
        None
    )

    result = await profiles_collection.update_one(
        {
            "email": current_user["email"]
        },
        {
            "$set": profile_data
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return {
        "message": "Profile updated successfully"
    }


# =========================================================
# UPLOAD PROFILE PHOTO
# =========================================================

@router.post("/photo")
async def upload_profile_photo(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):

    # -----------------------------------------------------
    # Validate content type
    # -----------------------------------------------------

    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed."
        )


    # -----------------------------------------------------
    # Read file
    # -----------------------------------------------------

    contents = await file.read()


    # -----------------------------------------------------
    # Validate size
    # -----------------------------------------------------

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Profile photo must be smaller than 5 MB."
        )

    if len(contents) == 0:
        raise HTTPException(
            status_code=400,
            detail="The selected image is empty."
        )


    # -----------------------------------------------------
    # Get existing profile
    # -----------------------------------------------------

    existing_profile = await profiles_collection.find_one(
        {
            "email": current_user["email"]
        }
    )

    if not existing_profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found. Create your profile first."
        )


    # -----------------------------------------------------
    # Delete old photo
    # -----------------------------------------------------

    old_photo = existing_profile.get(
        "profile_photo"
    )

    if old_photo:

        old_path = Path(
            "app/uploads"
        ) / old_photo

        if old_path.exists():
            try:
                old_path.unlink()
            except OSError:
                pass


    # -----------------------------------------------------
    # Generate unique filename
    # -----------------------------------------------------

    extension = ALLOWED_IMAGE_TYPES[
        file.content_type
    ]

    filename = (
        f"{uuid.uuid4().hex}"
        f"{extension}"
    )

    file_path = (
        PROFILE_UPLOAD_DIR /
        filename
    )


    # -----------------------------------------------------
    # Save image
    # -----------------------------------------------------

    try:

        with open(
            file_path,
            "wb"
        ) as buffer:

            buffer.write(contents)

    except Exception as error:

        print(
            "Profile photo save error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to save profile photo."
        )


    # -----------------------------------------------------
    # Path stored in MongoDB
    # -----------------------------------------------------

    photo_path = (
        f"profile/{filename}"
    )


    # -----------------------------------------------------
    # Update profile
    # -----------------------------------------------------

    try:

        result = await profiles_collection.update_one(
            {
                "email": current_user["email"]
            },
            {
                "$set": {
                    "profile_photo": photo_path
                }
            }
        )

        if result.matched_count == 0:

            file_path.unlink(
                missing_ok=True
            )

            raise HTTPException(
                status_code=404,
                detail="Profile not found."
            )

    except HTTPException:
        raise

    except Exception as error:

        file_path.unlink(
            missing_ok=True
        )

        print(
            "Profile photo database error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to update profile photo."
        )


    return {
        "message": "Profile photo uploaded successfully",
        "profile_photo": photo_path
    }


# =========================================================
# DELETE PROFILE PHOTO
# =========================================================

@router.delete("/photo")
async def delete_profile_photo(
    current_user=Depends(get_current_user)
):

    profile = await profiles_collection.find_one(
        {
            "email": current_user["email"]
        }
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found."
        )


    old_photo = profile.get(
        "profile_photo"
    )

    if not old_photo:

        return {
            "message": "No profile photo to remove."
        }


    # -----------------------------------------------------
    # Delete physical file
    # -----------------------------------------------------

    old_path = (
        Path("app/uploads") /
        old_photo
    )

    if old_path.exists():

        try:
            old_path.unlink()
        except OSError:
            pass


    # -----------------------------------------------------
    # Remove from MongoDB
    # -----------------------------------------------------

    await profiles_collection.update_one(
        {
            "email": current_user["email"]
        },
        {
            "$unset": {
                "profile_photo": ""
            }
        }
    )


    return {
        "message": "Profile photo removed successfully"
    }
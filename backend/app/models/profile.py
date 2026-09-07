from pydantic import BaseModel
from typing import Optional


class UserProfile(BaseModel):
    body_shape: str
    skin_tone: str
    color_season: str
    gender: str
    height: float
    weight: float
    age: int
    profile_photo: Optional[str] = None
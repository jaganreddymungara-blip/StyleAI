from pydantic import BaseModel
from typing import Optional


class WardrobeItem(BaseModel):
    name: str
    category: str
    color: str
    brand: str
    style: str
    description: Optional[str] = None
    image_url: Optional[str] = None

    favorite: bool = False
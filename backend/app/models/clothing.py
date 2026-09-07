from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Clothing(BaseModel):
    user_email: str

    image: str

    category: str

    brand: Optional[str] = ""

    color: str

    season: str

    occasion: str

    created_at: datetime = datetime.utcnow()
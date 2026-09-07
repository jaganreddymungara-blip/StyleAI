from pydantic import BaseModel


class OutfitRecommendation(BaseModel):
    top: str
    bottom: str
    shoes: str
    occasion: str
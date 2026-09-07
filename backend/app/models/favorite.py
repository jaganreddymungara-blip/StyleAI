from pydantic import BaseModel


class FavoriteOutfit(BaseModel):
    shirt: dict
    pant: dict
    shoe: dict
    score: int
    reasons: list[str]
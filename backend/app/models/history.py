from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime


class RecommendationHistory(BaseModel):
    score: int
    reasons: List[str]
    recommended_outfit: Dict
    created_at: datetime = datetime.utcnow()
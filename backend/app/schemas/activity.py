from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ActivityResponse(BaseModel):
    id: str
    titleEn: str
    titleTa: str
    time: str
    locationEn: str
    locationTa: str
    category: str
    date: str
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)

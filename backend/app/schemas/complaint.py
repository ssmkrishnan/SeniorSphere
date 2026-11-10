from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ComplaintCreate(BaseModel):
    categoryKey: Optional[str] = "room"
    titleEn: Optional[str] = "Maintenance Issue"
    titleTa: Optional[str] = "பராமரிப்பு பிரச்சனை"
    descriptionEn: Optional[str] = ""
    descriptionTa: Optional[str] = ""
    photoUrl: Optional[str] = None


class ComplaintStatusUpdate(BaseModel):
    status: str


class ComplaintResponse(BaseModel):
    id: str
    residentId: str
    categoryKey: str
    titleEn: str
    titleTa: str
    descriptionEn: str
    descriptionTa: str
    photoUrl: Optional[str] = None
    status: str
    createdAt: datetime
    updatedAt: datetime

    model_config = ConfigDict(from_attributes=True)

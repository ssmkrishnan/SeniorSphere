from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ResidentBase(BaseModel):
    nameEn: Optional[str] = None
    nameTa: Optional[str] = None
    dob: Optional[str] = None
    gender: Optional[str] = None
    bloodGroup: Optional[str] = None
    room: Optional[str] = None
    block: Optional[str] = None
    medicalConditions: Optional[str] = None
    allergies: Optional[str] = None
    currentMedications: Optional[str] = None
    avatarUrl: Optional[str] = None


class ResidentCreate(ResidentBase):
    pass


class ResidentResponse(ResidentBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    model_config = ConfigDict(from_attributes=True)

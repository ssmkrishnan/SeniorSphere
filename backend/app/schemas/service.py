from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ServiceRequestCreate(BaseModel):
    serviceType: Optional[str] = "general"
    notes: Optional[str] = ""


class CounsellingRequestCreate(BaseModel):
    categoryKey: Optional[str] = "pension"
    notes: Optional[str] = ""


class ServiceRequestResponse(BaseModel):
    id: str
    residentId: str
    serviceType: str
    status: str
    notes: Optional[str] = None
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)


class CounsellingRequestResponse(BaseModel):
    id: str
    residentId: str
    categoryKey: str
    status: str
    notes: Optional[str] = None
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)

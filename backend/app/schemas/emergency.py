from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict
from app.schemas.resident import ResidentResponse


class AlertCreate(BaseModel):
    type: Optional[str] = "sos"
    residentName: Optional[str] = None
    room: Optional[str] = None
    block: Optional[str] = None
    medicalConditions: Optional[str] = None


class AcknowledgeCreate(BaseModel):
    staffNameEn: Optional[str] = "Duty Staff"
    staffNameTa: Optional[str] = "பணி ஊழியர்"
    roleEn: Optional[str] = "Staff"
    roleTa: Optional[str] = "ஊழியர்"


class StaffAcknowledgementResponse(BaseModel):
    id: str
    alertId: str
    staffNameEn: str
    staffNameTa: str
    roleEn: str
    roleTa: str
    acknowledgedAt: datetime

    model_config = ConfigDict(from_attributes=True)


class EmergencyAlertResponse(BaseModel):
    id: str
    residentId: str
    type: str
    status: str
    location: str
    medicalSummary: str
    sharedWith: str
    sharedCount: str
    createdAt: datetime
    cancelledAt: Optional[datetime] = None
    acknowledgements: List[StaffAcknowledgementResponse] = []
    resident: Optional[ResidentResponse] = None

    model_config = ConfigDict(from_attributes=True)


class AlertTriggerResponse(BaseModel):
    success: bool = True
    data: EmergencyAlertResponse
    notifications: Optional[Dict[str, Any]] = None

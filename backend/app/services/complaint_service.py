from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import Complaint
from app.repositories.complaint_repository import ComplaintRepository
from app.repositories.resident_repository import ResidentRepository


class ComplaintService:
    def __init__(self) -> None:
        self.complaint_repo = ComplaintRepository()
        self.resident_repo = ResidentRepository()

    def get_complaints(self, db: Session, status: Optional[str] = None) -> List[Complaint]:
        return self.complaint_repo.get_all(db, status)

    def create_complaint(self, db: Session, data: Dict[str, Any]) -> Complaint:
        resident = self.resident_repo.get_latest(db)
        if not resident:
            raise HTTPException(status_code=404, detail="Resident not found")

        complaint_data = {
            "residentId": resident.id,
            "categoryKey": data.get("categoryKey") or "room",
            "titleEn": data.get("titleEn") or "Maintenance Issue",
            "titleTa": data.get("titleTa") or "பராமரிப்பு பிரச்சனை",
            "descriptionEn": data.get("descriptionEn") or "",
            "descriptionTa": data.get("descriptionTa") or "",
            "photoUrl": data.get("photoUrl"),
            "status": "in_progress"
        }
        return self.complaint_repo.create(db, complaint_data)

    def update_status(self, db: Session, complaint_id: str, status: str) -> Complaint:
        complaint = self.complaint_repo.update_status(db, complaint_id, status)
        if not complaint:
            raise HTTPException(status_code=404, detail="Complaint not found")
        return complaint

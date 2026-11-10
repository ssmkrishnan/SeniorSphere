from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import ServiceRequest, CounsellingRequest
from app.repositories.service_repository import ServiceRepository
from app.repositories.resident_repository import ResidentRepository


class ServiceService:
    def __init__(self) -> None:
        self.service_repo = ServiceRepository()
        self.resident_repo = ResidentRepository()

    def request_service(self, db: Session, service_type: Optional[str], notes: Optional[str]) -> ServiceRequest:
        resident = self.resident_repo.get_latest(db)
        if not resident:
            raise HTTPException(status_code=404, detail="Resident not found")

        data = {
            "residentId": resident.id,
            "serviceType": service_type or "general",
            "notes": notes or "",
            "status": "PENDING"
        }
        return self.service_repo.create_service_request(db, data)

    def request_counselling(self, db: Session, category_key: Optional[str], notes: Optional[str]) -> CounsellingRequest:
        resident = self.resident_repo.get_latest(db)
        if not resident:
            raise HTTPException(status_code=404, detail="Resident not found")

        data = {
            "residentId": resident.id,
            "categoryKey": category_key or "pension",
            "notes": notes or "",
            "status": "PENDING"
        }
        return self.service_repo.create_counselling_request(db, data)

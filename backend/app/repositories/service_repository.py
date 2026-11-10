from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.models import ServiceRequest, CounsellingRequest


class ServiceRepository:
    def create_service_request(self, db: Session, data: Dict[str, Any]) -> ServiceRequest:
        service_req = ServiceRequest(**data)
        db.add(service_req)
        db.commit()
        db.refresh(service_req)
        return service_req

    def create_counselling_request(self, db: Session, data: Dict[str, Any]) -> CounsellingRequest:
        counselling_req = CounsellingRequest(**data)
        db.add(counselling_req)
        db.commit()
        db.refresh(counselling_req)
        return counselling_req

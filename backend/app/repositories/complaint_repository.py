from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models.models import Complaint


class ComplaintRepository:
    def get_all(self, db: Session, status: Optional[str] = None) -> List[Complaint]:
        query = db.query(Complaint)
        if status and status != "all":
            query = query.filter(Complaint.status == status)
        return query.order_by(desc(Complaint.createdAt)).all()

    def create(self, db: Session, data: Dict[str, Any]) -> Complaint:
        complaint = Complaint(**data)
        db.add(complaint)
        db.commit()
        db.refresh(complaint)
        return complaint

    def update_status(self, db: Session, complaint_id: str, status: str) -> Optional[Complaint]:
        complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
        if not complaint:
            return None
        complaint.status = status
        db.commit()
        db.refresh(complaint)
        return complaint

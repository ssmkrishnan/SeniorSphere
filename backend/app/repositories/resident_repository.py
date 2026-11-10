from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models.models import Resident


class ResidentRepository:
    def get_latest(self, db: Session) -> Optional[Resident]:
        return db.query(Resident).order_by(desc(Resident.createdAt)).first()

    def create(self, db: Session, data: Dict[str, Any]) -> Resident:
        resident = Resident(**data)
        db.add(resident)
        db.commit()
        db.refresh(resident)
        return resident

    def update(self, db: Session, id: str, data: Dict[str, Any]) -> Optional[Resident]:
        resident = db.query(Resident).filter(Resident.id == id).first()
        if not resident:
            return None
        for key, value in data.items():
            if value is not None and hasattr(resident, key):
                setattr(resident, key, value)
        db.commit()
        db.refresh(resident)
        return resident

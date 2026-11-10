from typing import Optional, Dict, Any, Tuple
from sqlalchemy.orm import Session
from app.models.models import Resident
from app.repositories.resident_repository import ResidentRepository


class ResidentService:
    def __init__(self) -> None:
        self.repository = ResidentRepository()

    def get_profile(self, db: Session) -> Optional[Resident]:
        return self.repository.get_latest(db)

    def save_profile(self, db: Session, data: Dict[str, Any]) -> Tuple[Resident, bool]:
        resident = self.repository.get_latest(db)

        if not resident:
            create_data = {
                "nameEn": data.get("nameEn") or "",
                "nameTa": data.get("nameTa") or data.get("nameEn") or "",
                "dob": data.get("dob") or "",
                "gender": data.get("gender") or "",
                "bloodGroup": data.get("bloodGroup") or "",
                "medicalConditions": data.get("medicalConditions") or "",
                "allergies": data.get("allergies") or "",
                "currentMedications": data.get("currentMedications") or "",
                "room": data.get("room") or "",
                "block": data.get("block") or "",
                "avatarUrl": data.get("avatarUrl") or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            }
            new_resident = self.repository.create(db, create_data)
            return new_resident, True

        update_data = {k: v for k, v in data.items() if v is not None}
        updated_resident = self.repository.update(db, resident.id, update_data)
        return updated_resident, False

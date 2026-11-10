from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import EmergencyAlert, StaffAcknowledgement
from app.repositories.emergency_repository import EmergencyRepository
from app.repositories.resident_repository import ResidentRepository
from app.services.notification_service import NotificationService


class EmergencyService:
    def __init__(self) -> None:
        self.emergency_repo = EmergencyRepository()
        self.resident_repo = ResidentRepository()

    def get_active_alert(self, db: Session) -> Optional[EmergencyAlert]:
        return self.emergency_repo.get_active_alert(db)

    def trigger_alert(self, db: Session, data: Dict[str, Any]) -> Dict[str, Any]:
        resident = self.resident_repo.get_latest(db)
        if not resident:
            resident = self.resident_repo.create(db, {
                "nameEn": data.get("residentName") or "Resident",
                "nameTa": data.get("residentName") or "குடியிருப்பாளர்",
                "dob": "",
                "gender": "",
                "bloodGroup": "",
                "room": data.get("room") or "Room 203",
                "block": data.get("block") or "Block A",
                "medicalConditions": data.get("medicalConditions") or "",
                "allergies": "",
                "currentMedications": "",
                "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            })

        room = resident.room or data.get("room") or "Room 203"
        block = resident.block or data.get("block") or "Lotus Block"
        location = f"{room}, {block}"
        medical_summary = resident.medicalConditions or data.get("medicalConditions") or "None specified"

        alert = self.emergency_repo.create_alert(db, {
            "residentId": resident.id,
            "type": data.get("type") or "sos",
            "status": "ACTIVE",
            "location": location,
            "medicalSummary": medical_summary,
            "sharedWith": "Staff, Doctor, Family",
            "sharedCount": "3/5"
        })

        whatsapp = NotificationService.format_whatsapp_payload(
            room=room,
            residentNameEn=resident.nameEn or "Resident",
            residentNameTa=resident.nameTa or "குடியிருப்பாளர்",
            medicalInfo=medical_summary,
            location=location
        )

        sms = NotificationService.format_sms_payload(
            room=room,
            residentNameEn=resident.nameEn or "Resident"
        )

        notifications = {
            "whatsapp": whatsapp,
            "sms": sms
        }

        return {
            "alert": alert,
            "notifications": notifications
        }

    def cancel_alert(self, db: Session, alert_id: str) -> EmergencyAlert:
        alert = self.emergency_repo.cancel_alert(db, alert_id)
        if not alert:
            raise HTTPException(status_code=404, detail="Alert not found")
        return alert

    def acknowledge_alert(self, db: Session, alert_id: str, data: Dict[str, Any]) -> StaffAcknowledgement:
        ack = self.emergency_repo.create_acknowledgement(db, {
            "alertId": alert_id,
            "staffNameEn": data.get("staffNameEn") or "Duty Staff",
            "staffNameTa": data.get("staffNameTa") or "பணி ஊழியர்",
            "roleEn": data.get("roleEn") or "Staff",
            "roleTa": data.get("roleTa") or "ஊழியர்"
        })
        return ack

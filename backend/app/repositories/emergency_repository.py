from datetime import datetime
from typing import Optional, Dict, Any
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from app.models.models import EmergencyAlert, StaffAcknowledgement


class EmergencyRepository:
    def get_active_alert(self, db: Session) -> Optional[EmergencyAlert]:
        return (
            db.query(EmergencyAlert)
            .options(
                joinedload(EmergencyAlert.acknowledgements),
                joinedload(EmergencyAlert.resident)
            )
            .filter(EmergencyAlert.status == "ACTIVE")
            .order_by(desc(EmergencyAlert.createdAt))
            .first()
        )

    def create_alert(self, db: Session, data: Dict[str, Any]) -> EmergencyAlert:
        alert = EmergencyAlert(**data)
        db.add(alert)
        db.commit()
        db.refresh(alert)
        # Re-fetch with eager loads
        return (
            db.query(EmergencyAlert)
            .options(
                joinedload(EmergencyAlert.acknowledgements),
                joinedload(EmergencyAlert.resident)
            )
            .filter(EmergencyAlert.id == alert.id)
            .first()
        )

    def cancel_alert(self, db: Session, alert_id: str) -> Optional[EmergencyAlert]:
        alert = db.query(EmergencyAlert).filter(EmergencyAlert.id == alert_id).first()
        if not alert:
            return None
        alert.status = "CANCELLED"
        alert.cancelledAt = datetime.utcnow()
        db.commit()
        db.refresh(alert)
        return (
            db.query(EmergencyAlert)
            .options(
                joinedload(EmergencyAlert.acknowledgements),
                joinedload(EmergencyAlert.resident)
            )
            .filter(EmergencyAlert.id == alert.id)
            .first()
        )

    def create_acknowledgement(self, db: Session, data: Dict[str, Any]) -> StaffAcknowledgement:
        ack = StaffAcknowledgement(**data)
        db.add(ack)
        db.commit()
        db.refresh(ack)
        return ack

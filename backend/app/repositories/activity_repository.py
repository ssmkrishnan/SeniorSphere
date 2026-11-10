from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import asc
from app.models.models import Activity


class ActivityRepository:
    def get_today(self, db: Session) -> List[Activity]:
        return db.query(Activity).order_by(asc(Activity.time)).all()

    def count(self, db: Session) -> int:
        return db.query(Activity).count()

    def create_many(self, db: Session, activities: List[Dict[str, Any]]) -> List[Activity]:
        created_records = []
        for item in activities:
            activity = Activity(**item)
            db.add(activity)
            created_records.append(activity)
        db.commit()
        return created_records

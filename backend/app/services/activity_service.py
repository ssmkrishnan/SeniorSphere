from typing import List
from sqlalchemy.orm import Session
from app.models.models import Activity
from app.repositories.activity_repository import ActivityRepository


class ActivityService:
    def __init__(self) -> None:
        self.repository = ActivityRepository()

    def get_today_activities(self, db: Session) -> List[Activity]:
        return self.repository.get_today(db)

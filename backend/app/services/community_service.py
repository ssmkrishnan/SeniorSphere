from typing import List
from sqlalchemy.orm import Session
from app.models.models import CommunityBirthday, GalleryItem
from app.repositories.community_repository import CommunityRepository


class CommunityService:
    def __init__(self) -> None:
        self.repository = CommunityRepository()

    def get_birthdays(self, db: Session) -> List[CommunityBirthday]:
        return self.repository.get_birthdays(db)

    def get_gallery(self, db: Session) -> List[GalleryItem]:
        return self.repository.get_gallery(db)

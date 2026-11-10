from typing import List
from sqlalchemy.orm import Session
from app.models.models import CommunityBirthday, GalleryItem


class CommunityRepository:
    def get_birthdays(self, db: Session) -> List[CommunityBirthday]:
        return db.query(CommunityBirthday).all()

    def get_gallery(self, db: Session) -> List[GalleryItem]:
        return db.query(GalleryItem).all()

from app.repositories.community_repository import CommunityRepository
from app.models.models import CommunityBirthday, GalleryItem


def test_get_birthdays_empty(db_session):
    repo = CommunityRepository()
    result = repo.get_birthdays(db_session)
    assert result == []


def test_get_gallery_empty(db_session):
    repo = CommunityRepository()
    result = repo.get_gallery(db_session)
    assert result == []


def test_get_birthdays_with_data(db_session):
    repo = CommunityRepository()
    b1 = CommunityBirthday(
        nameEn="Janaki",
        nameTa="ஜானகி",
        date="1945-12-01",
        role="Resident",
        photoUrl="http://photo.com/janaki.jpg"
    )
    db_session.add(b1)
    db_session.commit()

    birthdays = repo.get_birthdays(db_session)
    assert len(birthdays) == 1
    assert birthdays[0].nameEn == "Janaki"


def test_get_gallery_with_data(db_session):
    repo = CommunityRepository()
    g1 = GalleryItem(
        titleEn="Pongal Celebration",
        titleTa="பொங்கல் கொண்டாட்டம்",
        photoUrl="http://photo.com/pongal.jpg"
    )
    db_session.add(g1)
    db_session.commit()

    gallery = repo.get_gallery(db_session)
    assert len(gallery) == 1
    assert gallery[0].titleEn == "Pongal Celebration"

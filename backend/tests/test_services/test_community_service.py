from unittest.mock import MagicMock
from app.services.community_service import CommunityService
from app.models.models import CommunityBirthday, GalleryItem


def test_get_birthdays():
    service = CommunityService()
    expected_birthdays = [
        CommunityBirthday(id="b1", nameEn="Murali", date="1955-08-15", photoUrl="http://photo.com/1"),
        CommunityBirthday(id="b2", nameEn="Lakshmi", date="1960-11-20", photoUrl="http://photo.com/2")
    ]
    service.repository.get_birthdays = MagicMock(return_value=expected_birthdays)
    mock_db = MagicMock()

    result = service.get_birthdays(mock_db)

    assert result == expected_birthdays
    assert len(result) == 2
    service.repository.get_birthdays.assert_called_once_with(mock_db)


def test_get_gallery():
    service = CommunityService()
    expected_gallery = [
        GalleryItem(id="g1", titleEn="Diwali Celebration", photoUrl="http://photo.com/g1"),
        GalleryItem(id="g2", titleEn="Garden Walk", photoUrl="http://photo.com/g2")
    ]
    service.repository.get_gallery = MagicMock(return_value=expected_gallery)
    mock_db = MagicMock()

    result = service.get_gallery(mock_db)

    assert result == expected_gallery
    assert len(result) == 2
    service.repository.get_gallery.assert_called_once_with(mock_db)

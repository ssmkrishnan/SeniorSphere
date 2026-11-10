from unittest.mock import MagicMock
from app.services.activity_service import ActivityService
from app.models.models import Activity


def test_get_today_activities():
    service = ActivityService()
    expected_activities = [
        Activity(id="a1", titleEn="Morning Yoga", time="07:00 AM"),
        Activity(id="a2", titleEn="Evening Walk", time="05:00 PM")
    ]
    service.repository.get_today = MagicMock(return_value=expected_activities)
    mock_db = MagicMock()

    result = service.get_today_activities(mock_db)

    assert result == expected_activities
    assert len(result) == 2
    service.repository.get_today.assert_called_once_with(mock_db)

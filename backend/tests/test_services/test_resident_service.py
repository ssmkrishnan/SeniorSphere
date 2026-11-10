from unittest.mock import MagicMock
from app.services.resident_service import ResidentService
from app.models.models import Resident


def test_get_profile_returns_none_when_empty():
    service = ResidentService()
    service.repository.get_latest = MagicMock(return_value=None)
    mock_db = MagicMock()

    result = service.get_profile(mock_db)

    assert result is None
    service.repository.get_latest.assert_called_once_with(mock_db)


def test_get_profile_returns_resident():
    service = ResidentService()
    expected_resident = Resident(id="res-1", nameEn="Murali", room="101")
    service.repository.get_latest = MagicMock(return_value=expected_resident)
    mock_db = MagicMock()

    result = service.get_profile(mock_db)

    assert result == expected_resident
    assert result.nameEn == "Murali"


def test_save_profile_creates_when_no_existing():
    service = ResidentService()
    service.repository.get_latest = MagicMock(return_value=None)
    created_resident = Resident(id="res-new", nameEn="New Resident")
    service.repository.create = MagicMock(return_value=created_resident)
    mock_db = MagicMock()

    resident, is_created = service.save_profile(mock_db, {"nameEn": "New Resident"})

    assert resident == created_resident
    assert is_created is True
    service.repository.create.assert_called_once()


def test_save_profile_updates_existing():
    service = ResidentService()
    existing_resident = Resident(id="res-1", nameEn="Old Name", room="101")
    service.repository.get_latest = MagicMock(return_value=existing_resident)
    updated_resident = Resident(id="res-1", nameEn="Updated Name", room="101")
    service.repository.update = MagicMock(return_value=updated_resident)
    mock_db = MagicMock()

    resident, is_created = service.save_profile(mock_db, {"nameEn": "Updated Name"})

    assert resident == updated_resident
    assert is_created is False
    service.repository.update.assert_called_once_with(mock_db, "res-1", {"nameEn": "Updated Name"})


def test_save_profile_applies_defaults_on_create():
    service = ResidentService()
    service.repository.get_latest = MagicMock(return_value=None)
    service.repository.create = MagicMock(side_effect=lambda db, data: Resident(**data))
    mock_db = MagicMock()

    resident, is_created = service.save_profile(mock_db, {})

    assert is_created is True
    assert resident.nameEn == ""
    assert resident.room == ""
    assert "https://images.unsplash.com" in resident.avatarUrl

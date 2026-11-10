from unittest.mock import MagicMock
import pytest
from fastapi import HTTPException
from app.services.emergency_service import EmergencyService
from app.models.models import EmergencyAlert, Resident, StaffAcknowledgement


def test_get_active_alert_none():
    service = EmergencyService()
    service.emergency_repo.get_active_alert = MagicMock(return_value=None)
    mock_db = MagicMock()

    result = service.get_active_alert(mock_db)

    assert result is None
    service.emergency_repo.get_active_alert.assert_called_once_with(mock_db)


def test_get_active_alert_found():
    service = EmergencyService()
    expected_alert = EmergencyAlert(id="alert-1", status="ACTIVE", type="sos")
    service.emergency_repo.get_active_alert = MagicMock(return_value=expected_alert)
    mock_db = MagicMock()

    result = service.get_active_alert(mock_db)

    assert result == expected_alert
    assert result.status == "ACTIVE"


def test_trigger_alert_with_existing_resident():
    service = EmergencyService()
    existing_resident = Resident(
        id="res-1",
        nameEn="John Doe",
        nameTa="ஜான் டோ",
        room="Room 101",
        block="Lotus Block",
        medicalConditions="Asthma"
    )
    service.resident_repo.get_latest = MagicMock(return_value=existing_resident)

    created_alert = EmergencyAlert(
        id="alert-1",
        residentId="res-1",
        type="sos",
        status="ACTIVE",
        location="Room 101, Lotus Block",
        medicalSummary="Asthma"
    )
    service.emergency_repo.create_alert = MagicMock(return_value=created_alert)
    mock_db = MagicMock()

    service.resident_repo.create = MagicMock()
    result = service.trigger_alert(mock_db, {"type": "sos"})

    assert result["alert"] == created_alert
    assert "notifications" in result
    service.resident_repo.create.assert_not_called()
    service.emergency_repo.create_alert.assert_called_once()


def test_trigger_alert_creates_resident_if_none():
    service = EmergencyService()
    service.resident_repo.get_latest = MagicMock(return_value=None)
    auto_resident = Resident(
        id="res-auto",
        nameEn="Guest",
        nameTa="விருந்தினர்",
        room="Room 203",
        block="Block A"
    )
    service.resident_repo.create = MagicMock(return_value=auto_resident)

    created_alert = EmergencyAlert(
        id="alert-2",
        residentId="res-auto",
        type="sos",
        status="ACTIVE"
    )
    service.emergency_repo.create_alert = MagicMock(return_value=created_alert)
    mock_db = MagicMock()

    result = service.trigger_alert(mock_db, {"residentName": "Guest"})

    assert result["alert"] == created_alert
    service.resident_repo.create.assert_called_once()


def test_trigger_alert_returns_notifications():
    service = EmergencyService()
    resident = Resident(
        id="res-1",
        nameEn="Raman",
        nameTa="ராமன்",
        room="Room 102",
        block="Lotus Block"
    )
    service.resident_repo.get_latest = MagicMock(return_value=resident)
    alert = EmergencyAlert(id="alert-3", residentId="res-1")
    service.emergency_repo.create_alert = MagicMock(return_value=alert)
    mock_db = MagicMock()

    result = service.trigger_alert(mock_db, {"type": "medical"})

    notifs = result["notifications"]
    assert "whatsapp" in notifs
    assert "sms" in notifs
    assert notifs["whatsapp"]["channel"] == "whatsapp"
    assert notifs["whatsapp"]["room"] == "Room 102"
    assert notifs["sms"]["channel"] == "sms"


def test_cancel_alert():
    service = EmergencyService()
    cancelled_alert = EmergencyAlert(id="alert-1", status="CANCELLED")
    service.emergency_repo.cancel_alert = MagicMock(return_value=cancelled_alert)
    mock_db = MagicMock()

    result = service.cancel_alert(mock_db, "alert-1")

    assert result == cancelled_alert
    assert result.status == "CANCELLED"
    service.emergency_repo.cancel_alert.assert_called_once_with(mock_db, "alert-1")

    # Non-existent alert raises 404
    service.emergency_repo.cancel_alert = MagicMock(return_value=None)
    with pytest.raises(HTTPException) as exc_info:
        service.cancel_alert(mock_db, "nonexistent")
    assert exc_info.value.status_code == 404


def test_acknowledge_alert_with_defaults():
    service = EmergencyService()
    ack = StaffAcknowledgement(
        id="ack-1",
        alertId="alert-1",
        staffNameEn="Duty Staff",
        staffNameTa="பணி ஊழியர்",
        roleEn="Staff",
        roleTa="ஊழியர்"
    )
    service.emergency_repo.create_acknowledgement = MagicMock(return_value=ack)
    mock_db = MagicMock()

    result = service.acknowledge_alert(mock_db, "alert-1", {})

    assert result == ack
    assert result.staffNameEn == "Duty Staff"
    service.emergency_repo.create_acknowledgement.assert_called_once()

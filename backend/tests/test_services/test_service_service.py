from unittest.mock import MagicMock
import pytest
from fastapi import HTTPException
from app.services.service_service import ServiceService
from app.models.models import ServiceRequest, CounsellingRequest, Resident


def test_request_service_success():
    service = ServiceService()
    resident = Resident(id="res-1")
    service.resident_repo.get_latest = MagicMock(return_value=resident)
    req = ServiceRequest(id="sr-1", residentId="res-1", serviceType="housekeeping", notes="Clean room")
    service.service_repo.create_service_request = MagicMock(return_value=req)
    mock_db = MagicMock()

    result = service.request_service(mock_db, "housekeeping", "Clean room")

    assert result == req
    service.service_repo.create_service_request.assert_called_once_with(
        mock_db,
        {"residentId": "res-1", "serviceType": "housekeeping", "notes": "Clean room", "status": "PENDING"}
    )


def test_request_service_no_resident_raises_404():
    service = ServiceService()
    service.resident_repo.get_latest = MagicMock(return_value=None)
    mock_db = MagicMock()

    with pytest.raises(HTTPException) as exc_info:
        service.request_service(mock_db, "housekeeping", "notes")
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Resident not found"


def test_request_service_defaults():
    service = ServiceService()
    resident = Resident(id="res-1")
    service.resident_repo.get_latest = MagicMock(return_value=resident)
    service.service_repo.create_service_request = MagicMock(
        side_effect=lambda db, data: ServiceRequest(**data)
    )
    mock_db = MagicMock()

    result = service.request_service(mock_db, None, None)

    assert result.serviceType == "general"
    assert result.notes == ""
    assert result.status == "PENDING"


def test_request_counselling_success():
    service = ServiceService()
    resident = Resident(id="res-1")
    service.resident_repo.get_latest = MagicMock(return_value=resident)
    counselling = CounsellingRequest(id="cr-1", residentId="res-1", categoryKey="pension", notes="Need help")
    service.service_repo.create_counselling_request = MagicMock(return_value=counselling)
    mock_db = MagicMock()

    result = service.request_counselling(mock_db, "pension", "Need help")

    assert result == counselling
    service.service_repo.create_counselling_request.assert_called_once_with(
        mock_db,
        {"residentId": "res-1", "categoryKey": "pension", "notes": "Need help", "status": "PENDING"}
    )


def test_request_counselling_no_resident_raises_404():
    service = ServiceService()
    service.resident_repo.get_latest = MagicMock(return_value=None)
    mock_db = MagicMock()

    with pytest.raises(HTTPException) as exc_info:
        service.request_counselling(mock_db, "legal", "notes")
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Resident not found"

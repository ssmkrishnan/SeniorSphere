from unittest.mock import MagicMock
import pytest
from fastapi import HTTPException
from app.services.complaint_service import ComplaintService
from app.models.models import Complaint, Resident


def test_get_complaints_no_filter():
    service = ComplaintService()
    mock_complaints = [
        Complaint(id="c1", titleEn="Issue 1"),
        Complaint(id="c2", titleEn="Issue 2")
    ]
    service.complaint_repo.get_all = MagicMock(return_value=mock_complaints)
    mock_db = MagicMock()

    result = service.get_complaints(mock_db)

    assert result == mock_complaints
    service.complaint_repo.get_all.assert_called_once_with(mock_db, None)


def test_get_complaints_with_filter():
    service = ComplaintService()
    resolved_complaints = [Complaint(id="c1", titleEn="Resolved Issue", status="resolved")]
    service.complaint_repo.get_all = MagicMock(return_value=resolved_complaints)
    mock_db = MagicMock()

    result = service.get_complaints(mock_db, status="resolved")

    assert result == resolved_complaints
    service.complaint_repo.get_all.assert_called_once_with(mock_db, "resolved")


def test_create_complaint_success():
    service = ComplaintService()
    resident = Resident(id="res-1", nameEn="Murali")
    service.resident_repo.get_latest = MagicMock(return_value=resident)

    created_complaint = Complaint(
        id="comp-1",
        residentId="res-1",
        categoryKey="room",
        titleEn="Fan noise",
        status="in_progress"
    )
    service.complaint_repo.create = MagicMock(return_value=created_complaint)
    mock_db = MagicMock()

    result = service.create_complaint(mock_db, {"titleEn": "Fan noise"})

    assert result == created_complaint
    service.complaint_repo.create.assert_called_once()


def test_create_complaint_no_resident_raises_404():
    service = ComplaintService()
    service.resident_repo.get_latest = MagicMock(return_value=None)
    mock_db = MagicMock()

    with pytest.raises(HTTPException) as exc_info:
        service.create_complaint(mock_db, {"titleEn": "Issue"})
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Resident not found"


def test_create_complaint_applies_defaults():
    service = ComplaintService()
    resident = Resident(id="res-1")
    service.resident_repo.get_latest = MagicMock(return_value=resident)
    service.complaint_repo.create = MagicMock(side_effect=lambda db, data: Complaint(**data))
    mock_db = MagicMock()

    result = service.create_complaint(mock_db, {})

    assert result.residentId == "res-1"
    assert result.categoryKey == "room"
    assert result.titleEn == "Maintenance Issue"
    assert result.titleTa == "பராமரிப்பு பிரச்சனை"
    assert result.status == "in_progress"


def test_update_status():
    service = ComplaintService()
    updated = Complaint(id="c-1", status="resolved")
    service.complaint_repo.update_status = MagicMock(return_value=updated)
    mock_db = MagicMock()

    result = service.update_status(mock_db, "c-1", "resolved")

    assert result == updated
    assert result.status == "resolved"
    service.complaint_repo.update_status.assert_called_once_with(mock_db, "c-1", "resolved")

    # Not found raises 404
    service.complaint_repo.update_status = MagicMock(return_value=None)
    with pytest.raises(HTTPException) as exc_info:
        service.update_status(mock_db, "c-nonexistent", "resolved")
    assert exc_info.value.status_code == 404

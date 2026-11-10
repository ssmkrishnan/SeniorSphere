from datetime import datetime, timedelta
from app.repositories.complaint_repository import ComplaintRepository
from app.repositories.resident_repository import ResidentRepository
from app.models.models import Complaint


def test_get_all_empty(db_session):
    repo = ComplaintRepository()
    result = repo.get_all(db_session)
    assert result == []


def test_create_complaint(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = ComplaintRepository()
    data = {
        "residentId": resident.id,
        "categoryKey": "maintenance",
        "titleEn": "Broken Window",
        "titleTa": "உடைந்த ஜன்னல்",
        "descriptionEn": "Window latch is loose",
        "descriptionTa": "ஜன்னல் தாழ்ப்பாள் தளர்வாக உள்ளது",
        "status": "in_progress"
    }
    complaint = repo.create(db_session, data)

    assert complaint is not None
    assert complaint.id is not None
    assert complaint.titleEn == "Broken Window"
    assert complaint.status == "in_progress"


def test_get_all_with_status_filter(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = ComplaintRepository()
    repo.create(db_session, {"residentId": resident.id, "titleEn": "C1", "status": "open"})
    repo.create(db_session, {"residentId": resident.id, "titleEn": "C2", "status": "resolved"})
    repo.create(db_session, {"residentId": resident.id, "titleEn": "C3", "status": "open"})

    open_complaints = repo.get_all(db_session, status="open")
    assert len(open_complaints) == 2
    for c in open_complaints:
        assert c.status == "open"

    resolved = repo.get_all(db_session, status="resolved")
    assert len(resolved) == 1
    assert resolved[0].status == "resolved"


def test_get_all_without_filter_returns_all(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = ComplaintRepository()
    repo.create(db_session, {"residentId": resident.id, "titleEn": "C1", "status": "open"})
    repo.create(db_session, {"residentId": resident.id, "titleEn": "C2", "status": "resolved"})

    all_complaints = repo.get_all(db_session)
    assert len(all_complaints) == 2

    all_filter_complaints = repo.get_all(db_session, status="all")
    assert len(all_filter_complaints) == 2


def test_update_status(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = ComplaintRepository()
    created = repo.create(db_session, {"residentId": resident.id, "titleEn": "Leak", "status": "open"})

    updated = repo.update_status(db_session, created.id, "resolved")
    assert updated is not None
    assert updated.status == "resolved"

    # Non-existent
    non_existent = repo.update_status(db_session, "nonexistent-id", "resolved")
    assert non_existent is None


def test_complaints_ordered_by_created_desc(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = ComplaintRepository()
    c1 = Complaint(
        residentId=resident.id,
        titleEn="First",
        createdAt=datetime.utcnow() - timedelta(minutes=10)
    )
    c2 = Complaint(
        residentId=resident.id,
        titleEn="Second",
        createdAt=datetime.utcnow()
    )
    db_session.add_all([c1, c2])
    db_session.commit()

    complaints = repo.get_all(db_session)
    assert len(complaints) == 2
    assert complaints[0].titleEn == "Second"
    assert complaints[1].titleEn == "First"

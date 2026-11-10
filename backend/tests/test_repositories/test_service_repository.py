from app.repositories.service_repository import ServiceRepository
from app.repositories.resident_repository import ResidentRepository


def test_create_service_request(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = ServiceRepository()
    data = {
        "residentId": resident.id,
        "serviceType": "housekeeping",
        "notes": "Urgent cleanup",
        "status": "PENDING"
    }
    req = repo.create_service_request(db_session, data)

    assert req is not None
    assert req.id is not None
    assert req.residentId == resident.id
    assert req.serviceType == "housekeeping"
    assert req.notes == "Urgent cleanup"
    assert req.status == "PENDING"


def test_create_counselling_request(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = ServiceRepository()
    data = {
        "residentId": resident.id,
        "categoryKey": "pension",
        "notes": "Pension issues",
        "status": "PENDING"
    }
    req = repo.create_counselling_request(db_session, data)

    assert req is not None
    assert req.id is not None
    assert req.residentId == resident.id
    assert req.categoryKey == "pension"
    assert req.notes == "Pension issues"
    assert req.status == "PENDING"


def test_service_request_defaults(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = ServiceRepository()
    req = repo.create_service_request(db_session, {
        "residentId": resident.id
    })

    assert req.serviceType == "general"
    assert req.status == "PENDING"
    assert req.notes is None


def test_counselling_request_defaults(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = ServiceRepository()
    req = repo.create_counselling_request(db_session, {
        "residentId": resident.id
    })

    assert req.categoryKey == "pension"
    assert req.status == "PENDING"
    assert req.notes is None

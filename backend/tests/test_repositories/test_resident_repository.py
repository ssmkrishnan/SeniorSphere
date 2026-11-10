from datetime import datetime, timedelta
from app.repositories.resident_repository import ResidentRepository
from app.models.models import Resident


def test_get_latest_empty(db_session):
    repo = ResidentRepository()
    result = repo.get_latest(db_session)
    assert result is None


def test_create_resident(db_session):
    repo = ResidentRepository()
    data = {
        "nameEn": "Ramanathan",
        "nameTa": "ராமநாதன்",
        "room": "Room 101",
        "block": "Block A"
    }
    resident = repo.create(db_session, data)

    assert resident is not None
    assert resident.id is not None
    assert resident.nameEn == "Ramanathan"
    assert resident.room == "Room 101"


def test_get_latest_returns_most_recent(db_session):
    repo = ResidentRepository()
    earlier_time = datetime.utcnow() - timedelta(hours=1)
    later_time = datetime.utcnow()

    res1 = Resident(nameEn="First Resident", createdAt=earlier_time)
    res2 = Resident(nameEn="Second Resident", createdAt=later_time)
    db_session.add_all([res1, res2])
    db_session.commit()

    latest = repo.get_latest(db_session)
    assert latest is not None
    assert latest.nameEn == "Second Resident"


def test_update_resident(db_session):
    repo = ResidentRepository()
    created = repo.create(db_session, {"nameEn": "Original", "room": "100", "block": "Block A"})

    updated = repo.update(db_session, created.id, {"nameEn": "Updated Name", "room": "200"})

    assert updated is not None
    assert updated.id == created.id
    assert updated.nameEn == "Updated Name"
    assert updated.room == "200"
    assert updated.block == "Block A"


def test_update_partial_fields(db_session):
    repo = ResidentRepository()
    created = repo.create(db_session, {
        "nameEn": "John",
        "nameTa": "ஜான்",
        "room": "301",
        "block": "Block C"
    })

    # Only update nameEn, others should remain unchanged
    updated = repo.update(db_session, created.id, {"nameEn": "John Updated", "room": None})

    assert updated.nameEn == "John Updated"
    assert updated.nameTa == "ஜான்"
    assert updated.room == "301"
    assert updated.block == "Block C"

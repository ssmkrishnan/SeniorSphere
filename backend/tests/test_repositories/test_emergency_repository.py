from app.repositories.emergency_repository import EmergencyRepository
from app.repositories.resident_repository import ResidentRepository


def test_get_active_alert_none(db_session):
    repo = EmergencyRepository()
    result = repo.get_active_alert(db_session)
    assert result is None


def test_create_alert(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Test Resident", "room": "101"})

    repo = EmergencyRepository()
    alert_data = {
        "residentId": resident.id,
        "type": "sos",
        "status": "ACTIVE",
        "location": "Room 101",
        "medicalSummary": "Hypertension"
    }
    alert = repo.create_alert(db_session, alert_data)

    assert alert is not None
    assert alert.id is not None
    assert alert.residentId == resident.id
    assert alert.type == "sos"
    assert alert.status == "ACTIVE"
    assert alert.resident.nameEn == "Test Resident"


def test_get_active_alert_found(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Test Resident"})

    repo = EmergencyRepository()
    created = repo.create_alert(db_session, {
        "residentId": resident.id,
        "type": "medical",
        "status": "ACTIVE",
        "location": "Room 202"
    })

    found = repo.get_active_alert(db_session)
    assert found is not None
    assert found.id == created.id
    assert found.status == "ACTIVE"


def test_cancel_alert(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = EmergencyRepository()
    created = repo.create_alert(db_session, {
        "residentId": resident.id,
        "status": "ACTIVE"
    })

    cancelled = repo.cancel_alert(db_session, created.id)
    assert cancelled is not None
    assert cancelled.status == "CANCELLED"
    assert cancelled.cancelledAt is not None


def test_create_acknowledgement(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = EmergencyRepository()
    alert = repo.create_alert(db_session, {
        "residentId": resident.id,
        "status": "ACTIVE"
    })

    ack = repo.create_acknowledgement(db_session, {
        "alertId": alert.id,
        "staffNameEn": "Sister Mary",
        "staffNameTa": "சகோதரி மேரி",
        "roleEn": "Nurse",
        "roleTa": "செவிலியர்"
    })

    assert ack is not None
    assert ack.id is not None
    assert ack.alertId == alert.id
    assert ack.staffNameEn == "Sister Mary"
    assert ack.acknowledgedAt is not None


def test_get_active_ignores_cancelled(db_session):
    res_repo = ResidentRepository()
    resident = res_repo.create(db_session, {"nameEn": "Resident"})

    repo = EmergencyRepository()
    alert = repo.create_alert(db_session, {
        "residentId": resident.id,
        "status": "ACTIVE"
    })
    repo.cancel_alert(db_session, alert.id)

    active = repo.get_active_alert(db_session)
    assert active is None

def test_get_active_no_alert(client):
    response = client.get("/api/emergency/active")
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"] is None


def test_trigger_alert(client):
    # Setup resident
    client.post("/api/resident/profile", json={
        "nameEn": "Kalyani Ammal",
        "room": "Room 302",
        "block": "Block B",
        "medicalConditions": "Diabetes"
    })

    payload = {
        "type": "sos",
        "room": "Room 302",
        "block": "Block B",
        "medicalConditions": "Diabetes"
    }
    response = client.post("/api/emergency/alert", json=payload)
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True
    assert "data" in res_data
    assert "notifications" in res_data
    assert res_data["data"]["status"] == "ACTIVE"
    assert "whatsapp" in res_data["notifications"]
    assert "sms" in res_data["notifications"]


def test_trigger_alert_creates_resident_if_none(client):
    payload = {
        "type": "medical",
        "residentName": "Auto Created Resident",
        "room": "Room 501",
        "block": "Block C"
    }
    response = client.post("/api/emergency/alert", json=payload)
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"]["status"] == "ACTIVE"
    assert res_data["data"]["residentId"] is not None

    # Verify resident was created
    prof_res = client.get("/api/resident/profile")
    assert prof_res.status_code == 200
    assert prof_res.json()["data"]["nameEn"] == "Auto Created Resident"


def test_cancel_alert(client):
    trigger_res = client.post("/api/emergency/alert", json={"type": "sos"})
    alert_id = trigger_res.json()["data"]["id"]

    cancel_res = client.post(f"/api/emergency/{alert_id}/cancel")
    assert cancel_res.status_code == 200
    res_data = cancel_res.json()
    assert res_data["success"] is True
    assert res_data["data"]["status"] == "CANCELLED"
    assert res_data["data"]["cancelledAt"] is not None


def test_acknowledge_alert(client):
    trigger_res = client.post("/api/emergency/alert", json={"type": "sos"})
    alert_id = trigger_res.json()["data"]["id"]

    ack_payload = {
        "staffNameEn": "Dr. Sarah",
        "staffNameTa": "டாக்டர் சாரா",
        "roleEn": "Doctor",
        "roleTa": "மருத்துவர்"
    }
    ack_res = client.post(f"/api/emergency/{alert_id}/acknowledge", json=ack_payload)
    assert ack_res.status_code == 200
    res_data = ack_res.json()
    assert res_data["success"] is True
    assert res_data["data"]["staffNameEn"] == "Dr. Sarah"
    assert res_data["data"]["alertId"] == alert_id


def test_cancel_nonexistent_alert(client):
    response = client.post("/api/emergency/non-existent-id/cancel")
    assert response.status_code in [404, 500]

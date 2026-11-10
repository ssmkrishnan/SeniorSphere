def test_request_service(client):
    # Prerequisite: Create resident
    client.post("/api/resident/profile", json={"nameEn": "Subbulakshmi", "room": "104"})

    payload = {
        "serviceType": "housekeeping",
        "notes": "Please clean the room before noon"
    }
    response = client.post("/api/services/request", json=payload)
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"]["serviceType"] == "housekeeping"
    assert res_data["data"]["status"] == "PENDING"
    assert res_data["data"]["notes"] == "Please clean the room before noon"


def test_request_service_no_resident(client):
    payload = {
        "serviceType": "laundry",
        "notes": "Urgent laundry"
    }
    response = client.post("/api/services/request", json=payload)
    assert response.status_code == 404


def test_request_counselling(client):
    # Prerequisite: Create resident
    client.post("/api/resident/profile", json={"nameEn": "Subbulakshmi", "room": "104"})

    payload = {
        "categoryKey": "pension",
        "notes": "Need assistance with monthly pension paperwork"
    }
    response = client.post("/api/services/counselling/request", json=payload)
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"]["categoryKey"] == "pension"
    assert res_data["data"]["status"] == "PENDING"


def test_request_counselling_no_resident(client):
    payload = {
        "categoryKey": "legal",
        "notes": "Legal counsel needed"
    }
    response = client.post("/api/services/counselling/request", json=payload)
    assert response.status_code == 404


def test_request_service_with_defaults(client):
    # Prerequisite: Create resident
    client.post("/api/resident/profile", json={"nameEn": "Subbulakshmi", "room": "104"})

    response = client.post("/api/services/request", json={})
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"]["serviceType"] == "general"
    assert res_data["data"]["status"] == "PENDING"

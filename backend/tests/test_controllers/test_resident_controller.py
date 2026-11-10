def test_get_profile_empty(client):
    response = client.get("/api/resident/profile")
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"] is None


def test_create_profile(client):
    payload = {
        "nameEn": "Ramanathan Iyer",
        "nameTa": "ராமநாதன் ஐயர்",
        "dob": "1948-05-12",
        "gender": "Male",
        "bloodGroup": "O+",
        "room": "Room 101",
        "block": "Lotus Block",
        "medicalConditions": "Hypertension",
        "allergies": "Penicillin",
        "currentMedications": "Amlodipine 5mg",
        "avatarUrl": "https://example.com/avatar.jpg"
    }
    response = client.post("/api/resident/profile", json=payload)
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True
    data = res_data["data"]
    assert data["nameEn"] == "Ramanathan Iyer"
    assert data["nameTa"] == "ராமநாதன் ஐயர்"
    assert data["room"] == "Room 101"
    assert data["block"] == "Lotus Block"
    assert "id" in data


def test_update_profile(client):
    # First create
    client.post("/api/resident/profile", json={"nameEn": "Initial Name", "room": "101"})

    # Then update via PUT
    update_payload = {
        "nameEn": "Updated Ramanathan",
        "room": "Room 102"
    }
    response = client.put("/api/resident/profile", json=update_payload)
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"]["nameEn"] == "Updated Ramanathan"
    assert res_data["data"]["room"] == "Room 102"


def test_get_profile_after_create(client):
    client.post("/api/resident/profile", json={"nameEn": "Sundaram", "room": "204"})
    response = client.get("/api/resident/profile")
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"]["nameEn"] == "Sundaram"
    assert res_data["data"]["room"] == "204"


def test_create_profile_with_defaults(client):
    response = client.post("/api/resident/profile", json={})
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True
    data = res_data["data"]
    assert data["nameEn"] == ""
    assert "avatarUrl" in data
    assert "unsplash" in data["avatarUrl"]

def test_get_complaints_empty(client):
    response = client.get("/api/complaints")
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"] == []


def test_create_complaint(client):
    # Prerequisite: Create resident
    client.post("/api/resident/profile", json={"nameEn": "Venkatesh", "room": "105"})

    payload = {
        "categoryKey": "maintenance",
        "titleEn": "Leaking Tap",
        "titleTa": "கசியும் குழாய்",
        "descriptionEn": "Bathroom tap is leaking continuously",
        "descriptionTa": "குளியலறை குழாய் கசிகிறது",
        "photoUrl": "https://example.com/tap.jpg"
    }
    response = client.post("/api/complaints", json=payload)
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"]["titleEn"] == "Leaking Tap"
    assert res_data["data"]["status"] == "in_progress"


def test_create_complaint_no_resident(client):
    payload = {
        "categoryKey": "food",
        "titleEn": "Cold food",
        "descriptionEn": "Food was served cold"
    }
    response = client.post("/api/complaints", json=payload)
    assert response.status_code == 404


def test_get_complaints_with_status_filter(client):
    # Create resident
    client.post("/api/resident/profile", json={"nameEn": "Venkatesh"})

    # Create complaint (default status: in_progress)
    c1 = client.post("/api/complaints", json={"titleEn": "Issue 1"}).json()["data"]

    # Update status to resolved
    client.patch(f"/api/complaints/{c1['id']}/status", json={"status": "resolved"})

    # Create another complaint (in_progress)
    client.post("/api/complaints", json={"titleEn": "Issue 2"})

    # Filter resolved
    res_resolved = client.get("/api/complaints?status=resolved")
    assert res_resolved.status_code == 200
    resolved_data = res_resolved.json()["data"]
    assert len(resolved_data) == 1
    assert resolved_data[0]["status"] == "resolved"

    # Filter open
    res_open = client.get("/api/complaints?status=open")
    assert res_open.status_code == 200
    assert len(res_open.json()["data"]) == 0


def test_update_complaint_status(client):
    client.post("/api/resident/profile", json={"nameEn": "Resident"})
    c = client.post("/api/complaints", json={"titleEn": "Water Issue"}).json()["data"]

    update_res = client.patch(f"/api/complaints/{c['id']}/status", json={"status": "resolved"})
    assert update_res.status_code == 200
    assert update_res.json()["data"]["status"] == "resolved"


def test_get_complaints_all_filter(client):
    client.post("/api/resident/profile", json={"nameEn": "Resident"})
    client.post("/api/complaints", json={"titleEn": "Issue 1"})
    client.post("/api/complaints", json={"titleEn": "Issue 2"})

    response = client.get("/api/complaints?status=all")
    assert response.status_code == 200
    assert len(response.json()["data"]) == 2

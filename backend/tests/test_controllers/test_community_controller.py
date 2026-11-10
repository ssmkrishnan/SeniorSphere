def test_get_birthdays_empty(client):
    response = client.get("/api/community/birthdays")
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"] == []


def test_get_gallery_empty(client):
    response = client.get("/api/community/gallery")
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"] == []

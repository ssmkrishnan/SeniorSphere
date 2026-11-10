def test_get_modules(client):
    response = client.get("/api/entertainment/modules")
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert len(res_data["data"]) == 9


def test_modules_have_required_fields(client):
    response = client.get("/api/entertainment/modules")
    assert response.status_code == 200
    modules = response.json()["data"]
    for mod in modules:
        assert "id" in mod
        assert "nameEn" in mod
        assert "nameTa" in mod
        assert "icon" in mod
        assert "color" in mod


def test_modules_list_is_consistent(client):
    response = client.get("/api/entertainment/modules")
    assert response.status_code == 200
    module_ids = [m["id"] for m in response.json()["data"]]
    expected_ids = ["music", "movies", "audiobooks", "games", "devotional", "news", "brainGames", "liveTv", "activities"]
    assert module_ids == expected_ids

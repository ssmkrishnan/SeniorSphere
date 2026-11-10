from app.services.entertainment_service import EntertainmentService


def test_get_modules_returns_9():
    service = EntertainmentService()
    modules = service.get_modules()
    assert isinstance(modules, list)
    assert len(modules) == 9


def test_module_structure():
    service = EntertainmentService()
    modules = service.get_modules()
    for mod in modules:
        assert isinstance(mod, dict)
        assert "id" in mod
        assert "nameEn" in mod
        assert "nameTa" in mod
        assert "icon" in mod
        assert "color" in mod


def test_modules_contain_expected_ids():
    service = EntertainmentService()
    modules = service.get_modules()
    ids = {mod["id"] for mod in modules}
    expected = {"music", "movies", "audiobooks", "games", "devotional", "news", "brainGames", "liveTv", "activities"}
    assert ids == expected

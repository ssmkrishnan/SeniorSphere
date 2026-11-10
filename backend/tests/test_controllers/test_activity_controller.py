from app.models.models import Activity


def test_get_today_activities_empty(client):
    response = client.get("/api/activities/today")
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["data"] == []


def test_get_today_activities_returns_data(client, db_session):
    # Seed activities with different times
    act1 = Activity(
        titleEn="Evening Yoga",
        titleTa="மாலை யோகா",
        time="05:00 PM",
        locationEn="Garden",
        locationTa="தோட்டம்",
        category="wellness",
        date="2026-10-11"
    )
    act2 = Activity(
        titleEn="Morning Walk",
        titleTa="காலை நடைப்பயிற்சி",
        time="07:00 AM",
        locationEn="Park",
        locationTa="பூங்கா",
        category="fitness",
        date="2026-10-11"
    )
    act3 = Activity(
        titleEn="Afternoon Music",
        titleTa="மதிய இசை",
        time="02:00 PM",
        locationEn="Lounge",
        locationTa="வரவேற்பறை",
        category="music",
        date="2026-10-11"
    )
    db_session.add_all([act1, act2, act3])
    db_session.commit()

    response = client.get("/api/activities/today")
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["success"] is True
    data = res_data["data"]
    assert len(data) == 3
    # Activities should be ordered by time ascending
    times = [item["time"] for item in data]
    assert times == sorted(times)

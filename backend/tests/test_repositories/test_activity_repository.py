from app.repositories.activity_repository import ActivityRepository


def test_get_today_empty(db_session):
    repo = ActivityRepository()
    assert repo.get_today(db_session) == []


def test_count_empty(db_session):
    repo = ActivityRepository()
    assert repo.count(db_session) == 0


def test_create_many_and_get(db_session):
    repo = ActivityRepository()
    data = [
        {
            "titleEn": "Morning Yoga",
            "titleTa": "காலை யோகா",
            "time": "06:30 AM",
            "locationEn": "Hall A",
            "locationTa": "மண்டபம் ஏ",
            "category": "wellness",
            "date": "2026-10-11"
        },
        {
            "titleEn": "Evening Walk",
            "titleTa": "மாலை நடை",
            "time": "05:00 PM",
            "locationEn": "Garden",
            "locationTa": "தோட்டம்",
            "category": "fitness",
            "date": "2026-10-11"
        }
    ]
    created = repo.create_many(db_session, data)
    assert len(created) == 2

    today = repo.get_today(db_session)
    assert len(today) == 2


def test_count_after_create(db_session):
    repo = ActivityRepository()
    repo.create_many(db_session, [
        {
            "titleEn": "Chess",
            "titleTa": "சதுரங்கம்",
            "time": "04:00 PM",
            "locationEn": "Room 1",
            "locationTa": "அறை 1",
            "category": "games",
            "date": "2026-10-11"
        }
    ])
    assert repo.count(db_session) == 1


def test_ordered_by_time_asc(db_session):
    repo = ActivityRepository()
    activities = [
        {
            "titleEn": "Activity 3",
            "titleTa": "செயல்பாடு 3",
            "time": "18:00",
            "locationEn": "Hall",
            "locationTa": "மண்டபம்",
            "category": "general",
            "date": "2026-10-11"
        },
        {
            "titleEn": "Activity 1",
            "titleTa": "செயல்பாடு 1",
            "time": "08:00",
            "locationEn": "Hall",
            "locationTa": "மண்டபம்",
            "category": "general",
            "date": "2026-10-11"
        },
        {
            "titleEn": "Activity 2",
            "titleTa": "செயல்பாடு 2",
            "time": "12:00",
            "locationEn": "Hall",
            "locationTa": "மண்டபம்",
            "category": "general",
            "date": "2026-10-11"
        }
    ]
    repo.create_many(db_session, activities)

    results = repo.get_today(db_session)
    assert len(results) == 3
    times = [r.time for r in results]
    assert times == ["08:00", "12:00", "18:00"]

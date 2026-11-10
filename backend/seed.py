import sys
from app.database import SessionLocal, engine, Base
import app.models  # Register models
from app.models.models import Activity


def seed():
    print("Ensuring database tables exist...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        activity_count = db.query(Activity).count()
        if activity_count == 0:
            print("Activity count is 0. Seeding 5 default activities...")
            activities = [
                Activity(
                    titleEn="Morning Yoga",
                    titleTa="யோகா",
                    time="06:30 AM - 07:30 AM",
                    locationEn="Garden Area",
                    locationTa="தோட்ட பகுதி",
                    category="Health & Fitness",
                    date="2024-05-20"
                ),
                Activity(
                    titleEn="Bhajan Session",
                    titleTa="பஜன் அமர்வு",
                    time="08:00 AM - 09:00 AM",
                    locationEn="Activity Hall",
                    locationTa="செயல் அரங்கம்",
                    category="Devotional",
                    date="2024-05-20"
                ),
                Activity(
                    titleEn="Health Talk",
                    titleTa="ஆரோக்கிய பேச்சு",
                    time="11:00 AM - 12:00 PM",
                    locationEn="Activity Hall",
                    locationTa="செயல் அரங்கம்",
                    category="Wellness",
                    date="2024-05-20"
                ),
                Activity(
                    titleEn="Indoor Games",
                    titleTa="உட்புற விளையாட்டு",
                    time="04:00 PM - 05:30 PM",
                    locationEn="Recreation Room",
                    locationTa="பொழுதுபோக்கு அறை",
                    category="Recreation",
                    date="2024-05-20"
                ),
                Activity(
                    titleEn="Evening Movie",
                    titleTa="மாலை திரைப்படம்",
                    time="07:00 PM - 09:00 PM",
                    locationEn="Mini Theatre",
                    locationTa="திரைப்பட அரங்கு",
                    category="Entertainment",
                    date="2024-05-20"
                ),
            ]
            db.add_all(activities)
            db.commit()
            print("Successfully seeded 5 default activities.")
        else:
            print(f"Activities already present ({activity_count} found). Skipping seeding.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}", file=sys.stderr)
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()

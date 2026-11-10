import sys
from app.database import SessionLocal
from app.models.models import (
    StaffAcknowledgement,
    EmergencyAlert,
    Complaint,
    ServiceRequest,
    CounsellingRequest,
    Resident,
)


def clear_data():
    db = SessionLocal()
    try:
        print("Clearing database records in foreign key order...")
        db.query(StaffAcknowledgement).delete()
        db.query(EmergencyAlert).delete()
        db.query(Complaint).delete()
        db.query(ServiceRequest).delete()
        db.query(CounsellingRequest).delete()
        db.query(Resident).delete()
        db.commit()
        print("Successfully cleared all transactional and resident records.")
    except Exception as e:
        db.rollback()
        print(f"Error clearing data: {e}", file=sys.stderr)
        raise
    finally:
        db.close()


if __name__ == "__main__":
    clear_data()

from datetime import datetime
from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Health"])


@router.get("/health")
def get_health():
    return {
        "status": "HEALTHY",
        "service": "SeniorSphere Backend API",
        "database": "PostgreSQL",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

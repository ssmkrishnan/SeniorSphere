from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.common import ApiResponse
from app.schemas.activity import ActivityResponse
from app.services.activity_service import ActivityService

router = APIRouter(prefix="/api/activities", tags=["Activities"])


@router.get("/today", response_model=ApiResponse)
def get_today_activities(db: Session = Depends(get_db)):
    try:
        service = ActivityService()
        activities = service.get_today_activities(db)
        data = [ActivityResponse.model_validate(a).model_dump(mode="json") for a in activities]
        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

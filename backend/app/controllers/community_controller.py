from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.common import ApiResponse
from app.services.community_service import CommunityService

router = APIRouter(prefix="/api/community", tags=["Community"])


@router.get("/birthdays", response_model=ApiResponse)
def get_birthdays(db: Session = Depends(get_db)):
    try:
        service = CommunityService()
        birthdays = service.get_birthdays(db)
        return ApiResponse(success=True, data=birthdays)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/gallery", response_model=ApiResponse)
def get_gallery(db: Session = Depends(get_db)):
    try:
        service = CommunityService()
        gallery = service.get_gallery(db)
        return ApiResponse(success=True, data=gallery)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

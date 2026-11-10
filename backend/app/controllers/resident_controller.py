from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.common import ApiResponse
from app.schemas.resident import ResidentBase, ResidentResponse
from app.services.resident_service import ResidentService

router = APIRouter(prefix="/api/resident", tags=["Resident"])


@router.get("/profile", response_model=ApiResponse)
def get_resident_profile(db: Session = Depends(get_db)):
    try:
        service = ResidentService()
        resident = service.get_profile(db)
        data = ResidentResponse.model_validate(resident).model_dump(mode="json") if resident else None
        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/profile", response_model=ApiResponse)
def save_resident_profile_put(body: ResidentBase, response: Response, db: Session = Depends(get_db)):
    try:
        service = ResidentService()
        resident, is_created = service.save_profile(db, body.model_dump(exclude_unset=True))
        if is_created:
            response.status_code = status.HTTP_201_CREATED
        data = ResidentResponse.model_validate(resident).model_dump(mode="json") if resident else None
        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/profile", response_model=ApiResponse)
def save_resident_profile_post(body: ResidentBase, response: Response, db: Session = Depends(get_db)):
    return save_resident_profile_put(body, response, db)

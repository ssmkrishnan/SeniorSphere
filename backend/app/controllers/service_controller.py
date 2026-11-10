from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.common import ApiResponse
from app.schemas.service import ServiceRequestCreate, CounsellingRequestCreate, ServiceRequestResponse, CounsellingRequestResponse
from app.services.service_service import ServiceService

router = APIRouter(prefix="/api/services", tags=["Services"])


@router.post("/request", status_code=status.HTTP_201_CREATED, response_model=ApiResponse)
def request_service(body: ServiceRequestCreate, db: Session = Depends(get_db)):
    try:
        service = ServiceService()
        result = service.request_service(db, body.serviceType, body.notes)
        data = ServiceRequestResponse.model_validate(result).model_dump(mode="json")
        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/counselling/request", status_code=status.HTTP_201_CREATED, response_model=ApiResponse)
def request_counselling(body: CounsellingRequestCreate, db: Session = Depends(get_db)):
    try:
        service = ServiceService()
        result = service.request_counselling(db, body.categoryKey, body.notes)
        data = CounsellingRequestResponse.model_validate(result).model_dump(mode="json")
        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

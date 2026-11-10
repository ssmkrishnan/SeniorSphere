from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.common import ApiResponse
from app.schemas.complaint import ComplaintCreate, ComplaintStatusUpdate, ComplaintResponse
from app.services.complaint_service import ComplaintService

router = APIRouter(prefix="/api/complaints", tags=["Complaints"])


@router.get("", response_model=ApiResponse)
@router.get("/", response_model=ApiResponse)
def get_complaints(
    status_param: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db)
):
    try:
        service = ComplaintService()
        complaints = service.get_complaints(db, status_param)
        data = [ComplaintResponse.model_validate(c).model_dump(mode="json") for c in complaints]
        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("", status_code=status.HTTP_201_CREATED, response_model=ApiResponse)
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ApiResponse)
def create_complaint(body: ComplaintCreate, db: Session = Depends(get_db)):
    try:
        service = ComplaintService()
        complaint = service.create_complaint(db, body.model_dump(exclude_unset=True))
        data = ComplaintResponse.model_validate(complaint).model_dump(mode="json")
        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/{id}/status", response_model=ApiResponse)
def update_complaint_status(id: str, body: ComplaintStatusUpdate, db: Session = Depends(get_db)):
    try:
        service = ComplaintService()
        complaint = service.update_status(db, id, body.status)
        data = ComplaintResponse.model_validate(complaint).model_dump(mode="json")
        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

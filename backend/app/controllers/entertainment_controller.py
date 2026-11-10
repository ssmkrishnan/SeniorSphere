from fastapi import APIRouter, HTTPException
from app.schemas.common import ApiResponse
from app.services.entertainment_service import EntertainmentService

router = APIRouter(prefix="/api/entertainment", tags=["Entertainment"])


@router.get("/modules", response_model=ApiResponse)
def get_entertainment_modules():
    try:
        service = EntertainmentService()
        modules = service.get_modules()
        return ApiResponse(success=True, data=modules)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

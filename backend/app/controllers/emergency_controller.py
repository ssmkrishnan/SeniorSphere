from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.common import ApiResponse
from app.schemas.emergency import AlertCreate, AcknowledgeCreate, EmergencyAlertResponse, StaffAcknowledgementResponse
from app.services.emergency_service import EmergencyService
from app.websocket.manager import ws_manager

router = APIRouter(prefix="/api/emergency", tags=["Emergency"])


@router.get("/active", response_model=ApiResponse)
def get_active_emergency(db: Session = Depends(get_db)):
    try:
        service = EmergencyService()
        active_alert = service.get_active_alert(db)
        data = EmergencyAlertResponse.model_validate(active_alert).model_dump(mode="json") if active_alert else None
        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/alert", status_code=status.HTTP_201_CREATED, response_model=ApiResponse)
async def trigger_emergency_alert(body: AlertCreate, db: Session = Depends(get_db)):
    try:
        service = EmergencyService()
        result = service.trigger_alert(db, body.model_dump(exclude_unset=True))
        alert = result["alert"]
        notifications = result["notifications"]
        data = EmergencyAlertResponse.model_validate(alert).model_dump(mode="json")

        # Broadcast via WebSocket
        await ws_manager.broadcast("EMERGENCY_ALERT_TRIGGERED", {
            "alert": data,
            "notifications": notifications
        })

        return ApiResponse(
            success=True,
            data=data,
            notifications=notifications
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{id}/cancel", response_model=ApiResponse)
async def cancel_emergency_alert(id: str, db: Session = Depends(get_db)):
    try:
        service = EmergencyService()
        alert = service.cancel_alert(db, id)
        data = EmergencyAlertResponse.model_validate(alert).model_dump(mode="json")

        # Broadcast cancellation
        await ws_manager.broadcast("EMERGENCY_ALERT_CANCELLED", {
            "alertId": id
        })

        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{id}/acknowledge", response_model=ApiResponse)
async def acknowledge_emergency_alert(id: str, body: AcknowledgeCreate, db: Session = Depends(get_db)):
    try:
        service = EmergencyService()
        ack = service.acknowledge_alert(db, id, body.model_dump(exclude_unset=True))
        data = StaffAcknowledgementResponse.model_validate(ack).model_dump(mode="json")

        # Broadcast acknowledgement
        await ws_manager.broadcast("EMERGENCY_ALERT_ACKNOWLEDGED", {
            "alertId": id,
            "acknowledgement": data
        })

        return ApiResponse(success=True, data=data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

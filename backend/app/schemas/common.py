from pydantic import BaseModel, ConfigDict
from typing import Any, Optional


class ApiResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, arbitrary_types_allowed=True)

    success: bool = True
    data: Any = None
    error: Optional[str] = None
    notifications: Optional[dict] = None

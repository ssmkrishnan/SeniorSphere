from pydantic import BaseModel, ConfigDict


class EntertainmentModule(BaseModel):
    id: str
    nameEn: str
    nameTa: str
    icon: str
    color: str

    model_config = ConfigDict(from_attributes=True)

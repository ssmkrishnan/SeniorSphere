from pydantic import BaseModel, ConfigDict


class BirthdayResponse(BaseModel):
    id: str
    nameEn: str
    nameTa: str
    date: str
    role: str
    photoUrl: str

    model_config = ConfigDict(from_attributes=True)


class GalleryItemResponse(BaseModel):
    id: str
    titleEn: str
    titleTa: str
    photoUrl: str

    model_config = ConfigDict(from_attributes=True)

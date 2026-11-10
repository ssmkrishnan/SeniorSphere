import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


class Resident(Base):
    __tablename__ = "Resident"

    id = Column(String, primary_key=True, default=generate_uuid)
    nameEn = Column(String, nullable=False, default="")
    nameTa = Column(String, nullable=False, default="")
    dob = Column(String, nullable=False, default="")
    gender = Column(String, nullable=False, default="")
    bloodGroup = Column(String, nullable=False, default="")
    room = Column(String, nullable=False, default="")
    block = Column(String, nullable=False, default="")
    medicalConditions = Column(String, nullable=False, default="")
    allergies = Column(String, nullable=False, default="")
    currentMedications = Column(String, nullable=False, default="")
    avatarUrl = Column(String, nullable=False, default="")
    createdAt = Column(DateTime, default=datetime.utcnow, nullable=False)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    alerts = relationship("EmergencyAlert", back_populates="resident", cascade="all, delete-orphan")
    complaints = relationship("Complaint", back_populates="resident", cascade="all, delete-orphan")
    services = relationship("ServiceRequest", back_populates="resident", cascade="all, delete-orphan")
    counsellings = relationship("CounsellingRequest", back_populates="resident", cascade="all, delete-orphan")


class EmergencyAlert(Base):
    __tablename__ = "EmergencyAlert"

    id = Column(String, primary_key=True, default=generate_uuid)
    residentId = Column(String, ForeignKey("Resident.id"), nullable=False)
    type = Column(String, default="sos", nullable=False)
    status = Column(String, default="ACTIVE", nullable=False)
    location = Column(String, nullable=False, default="")
    medicalSummary = Column(String, nullable=False, default="")
    sharedWith = Column(String, default="Staff, Doctor, Family", nullable=False)
    sharedCount = Column(String, default="3/5", nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow, nullable=False)
    cancelledAt = Column(DateTime, nullable=True)

    resident = relationship("Resident", back_populates="alerts")
    acknowledgements = relationship("StaffAcknowledgement", back_populates="alert", cascade="all, delete-orphan")


class StaffAcknowledgement(Base):
    __tablename__ = "StaffAcknowledgement"

    id = Column(String, primary_key=True, default=generate_uuid)
    alertId = Column(String, ForeignKey("EmergencyAlert.id"), nullable=False)
    staffNameEn = Column(String, nullable=False, default="")
    staffNameTa = Column(String, nullable=False, default="")
    roleEn = Column(String, nullable=False, default="")
    roleTa = Column(String, nullable=False, default="")
    acknowledgedAt = Column(DateTime, default=datetime.utcnow, nullable=False)

    alert = relationship("EmergencyAlert", back_populates="acknowledgements")


class Complaint(Base):
    __tablename__ = "Complaint"

    id = Column(String, primary_key=True, default=generate_uuid)
    residentId = Column(String, ForeignKey("Resident.id"), nullable=False)
    categoryKey = Column(String, nullable=False, default="room")
    titleEn = Column(String, nullable=False, default="")
    titleTa = Column(String, nullable=False, default="")
    descriptionEn = Column(String, nullable=False, default="")
    descriptionTa = Column(String, nullable=False, default="")
    photoUrl = Column(String, nullable=True)
    status = Column(String, default="in_progress", nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow, nullable=False)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    resident = relationship("Resident", back_populates="complaints")


class Activity(Base):
    __tablename__ = "Activity"

    id = Column(String, primary_key=True, default=generate_uuid)
    titleEn = Column(String, nullable=False)
    titleTa = Column(String, nullable=False)
    time = Column(String, nullable=False)
    locationEn = Column(String, nullable=False)
    locationTa = Column(String, nullable=False)
    category = Column(String, nullable=False)
    date = Column(String, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow, nullable=False)


class ServiceRequest(Base):
    __tablename__ = "ServiceRequest"

    id = Column(String, primary_key=True, default=generate_uuid)
    residentId = Column(String, ForeignKey("Resident.id"), nullable=False)
    serviceType = Column(String, nullable=False, default="general")
    status = Column(String, default="PENDING", nullable=False)
    notes = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow, nullable=False)

    resident = relationship("Resident", back_populates="services")


class CounsellingRequest(Base):
    __tablename__ = "CounsellingRequest"

    id = Column(String, primary_key=True, default=generate_uuid)
    residentId = Column(String, ForeignKey("Resident.id"), nullable=False)
    categoryKey = Column(String, nullable=False, default="pension")
    status = Column(String, default="PENDING", nullable=False)
    notes = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow, nullable=False)

    resident = relationship("Resident", back_populates="counsellings")


class CommunityBirthday(Base):
    __tablename__ = "CommunityBirthday"

    id = Column(String, primary_key=True, default=generate_uuid)
    nameEn = Column(String, nullable=False)
    nameTa = Column(String, nullable=False)
    date = Column(String, nullable=False)
    role = Column(String, default="Resident", nullable=False)
    photoUrl = Column(String, nullable=False)


class GalleryItem(Base):
    __tablename__ = "GalleryItem"

    id = Column(String, primary_key=True, default=generate_uuid)
    titleEn = Column(String, nullable=False)
    titleTa = Column(String, nullable=False)
    photoUrl = Column(String, nullable=False)

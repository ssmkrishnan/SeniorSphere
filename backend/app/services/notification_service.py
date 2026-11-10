from datetime import datetime
from urllib.parse import quote_plus
from typing import Dict, Any


class NotificationService:
    @staticmethod
    def format_whatsapp_payload(
        room: str,
        residentNameEn: str,
        residentNameTa: str,
        medicalInfo: str,
        location: str
    ) -> Dict[str, Any]:
        current_time = datetime.now().strftime("%I:%M %p")
        return {
            "channel": "whatsapp",
            "sender": "SeniorSphere Verified Care System",
            "recipient": "Duty Doctor, Duty Nurse, Emergency Family Contacts",
            "room": room,
            "residentNameEn": residentNameEn,
            "residentNameTa": residentNameTa,
            "time": current_time,
            "location": location,
            "medicalInfo": medicalInfo,
            "sharedWith": "Staff, Doctor, Family (3/5)",
            "mapLink": f"https://maps.google.com/?q={quote_plus(location)}",
            "status": "SENT"
        }

    @staticmethod
    def format_sms_payload(
        room: str,
        residentNameEn: str
    ) -> Dict[str, Any]:
        current_time = datetime.now().strftime("%I:%M %p")
        return {
            "channel": "sms",
            "sender": "SENIOR-SPHERE",
            "recipient": "All Registered Emergency Contacts",
            "room": room,
            "residentNameEn": residentNameEn,
            "residentNameTa": "",
            "time": current_time,
            "location": room,
            "medicalInfo": "",
            "sharedWith": "Emergency Contacts",
            "mapLink": "",
            "status": "DELIVERED"
        }

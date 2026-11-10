export const translations = {
  en: {
    // App Brand
    appName: "SeniorSphere",
    tagline: "Connected Care. Comfortable Living.",
    heroTitle: "A Complete Care Ecosystem for Senior Living Communities",
    quote: "Caring today, enriching tomorrows.",
    values: {
      safe: "Safe & Secure",
      happy: "Healthy & Happy",
      community: "Connected Community",
      empowered: "Empowered Residents",
      trustedDesc: "Your data is safe and private.",
      supportDesc: "Always here for you.",
      easyDesc: "Simple, clear & senior-friendly.",
      careDesc: "Because you matter to us."
    },

    // Bottom Navigation
    nav: {
      home: "Home",
      community: "Community",
      alert: "Alert",
      services: "Services",
      more: "More"
    },

    // Screen 1: Onboarding
    onboarding: {
      title: "SeniorSphere",
      subtitle: "Connected Care.\nComfortable Living.",
      getStarted: "Get Started",
      alreadyAccount: "Already have an account?",
      login: "Login",
      languageToggle: "தமிழ்"
    },

    // Screen 2: Add Resident Profile
    profileForm: {
      title: "Add Resident Profile",
      infoBanner: "This helps us serve you better in any situation.",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      dob: "Date of Birth",
      gender: "Gender",
      genderFemale: "Female",
      genderMale: "Male",
      bloodGroup: "Blood Group",
      medicalInfo: "Medical Information",
      medicalConditions: "Medical Conditions",
      allergies: "Allergies",
      noneAllergies: "None",
      currentMedications: "Current Medications",
      saveProfile: "Save Profile",
      sampleName: "Shanti Devi",
      sampleDob: "15 Aug 1950",
      sampleConditions: "Hypertension, Arthritis",
      sampleMeds: "Amlodipine 5mg (Morning)\nCalcium Tablet (Night)"
    },

    // Screen 3: Emergency Alert
    sos: {
      title: "Emergency Alert",
      needHelp: "Need Help?",
      instruction: "Tap the Alert button to notify the staff immediately.",
      medicalEmergency: "Medical Emergency",
      callStaff: "Call Staff",
      cancelAlert: "Cancel Alert"
    },

    // Screen 4: Cancel Alert / In Progress
    alertProgress: {
      title: "Alert in Progress",
      notifiedTeam: "We have notified the team.",
      locationLabel: "Location",
      locationVal: "Room 203, Lotus Block",
      medicalLabel: "Medical Info",
      medicalVal: "Hypertension, Arthritis",
      sharedLabel: "Shared With",
      sharedVal: "Staff, Doctor, Family",
      sharedFraction: "3/5",
      cancelPromptTitle: "Cancel this alert?",
      cancelPromptDesc: "Your alert will be cancelled and team will be notified.",
      keepAlert: "Keep Alert",
      yesCancel: "Yes, Cancel Alert"
    },

    // Screen 5: Notification Sent (WhatsApp & SMS)
    notification: {
      title: "Notification Sent",
      tabWhatsapp: "WhatsApp",
      tabSms: "SMS",
      online: "Online",
      alertHeadline: "Emergency Alert from Room 203",
      alertBody: "An emergency alert has been sent by Shanti Devi.",
      timeLabel: "Time",
      timeVal: "20 May 2024, 10:04 AM",
      locLabel: "Location",
      locVal: "Room 203, Lotus Block",
      medLabel: "Medical Info",
      medVal: "Hypertension, Arthritis",
      sharedLabel: "Shared With",
      sharedVal: "Staff, Doctor, Family",
      viewOnMap: "View on Map",
      acknowledgedBy: "Acknowledged by:",
      nurse: "Nurse Kavita",
      nurseTime: "10:05 AM",
      doctor: "Duty Doctor",
      doctorTime: "10:06 AM",
      smsNote: "SMS also sent to all emergency contacts.",
      sentSuccess: "Message sent successfully."
    },

    // Screen 6: Complaint / Request
    complaint: {
      title: "Raise a Complaint",
      subtitle: "Tell us what's bothering you",
      categories: {
        room: "Room & Facility",
        food: "Food",
        maintenance: "Maintenance",
        staff: "Staff Behavior",
        health: "Health Care",
        other: "Other"
      },
      descLabel: "Description",
      descPlaceholder: "The bathroom tap is leaking since yesterday.",
      addPhoto: "Add Photo (Optional)",
      submit: "Submit Complaint",
      submittedToast: "Complaint registered successfully!"
    },

    // Screen 7: Complaint Status
    complaintStatus: {
      title: "My Complaints",
      tabs: {
        all: "All",
        open: "Open",
        inProgress: "In Progress",
        resolved: "Resolved"
      },
      statusText: {
        inProgress: "In Progress",
        resolved: "Resolved",
        open: "Open"
      },
      items: [
        {
          id: "C-101",
          title: "Bathroom tap leaking",
          date: "20 May 2024, 09:15 AM",
          status: "in_progress",
          category: "Room & Facility"
        },
        {
          id: "C-102",
          title: "Fan not working",
          date: "18 May 2024, 11:30 AM",
          status: "resolved",
          category: "Maintenance"
        },
        {
          id: "C-103",
          title: "Food is too salty",
          date: "15 May 2024, 01:45 PM",
          status: "resolved",
          category: "Food"
        },
        {
          id: "C-104",
          title: "Bed side light not working",
          date: "10 May 2024, 04:20 PM",
          status: "resolved",
          category: "Room & Facility"
        }
      ]
    },

    // Screen 8: Entertainment Hub
    entertainment: {
      title: "Wellbeing & Entertainment",
      heroTitle: "Enjoy Every Moment:",
      heroSubtitle: "Fun, learning, games and just for you!",
      explore: "Explore",
      modules: {
        music: "Music",
        movies: "Movies",
        audiobooks: "Audiobooks",
        games: "Games",
        devotional: "Devotional",
        news: "News",
        brainGames: "Brain Games",
        liveTv: "Live TV",
        activities: "Activities"
      }
    },

    // Screen 9: Daily Activities
    activities: {
      title: "Today at SeniorSphere",
      date: "Monday, 20 May 2024",
      items: [
        {
          time: "06:30 AM - 07:30 AM",
          title: "Morning Yoga",
          location: "Garden Area",
          category: "Health & Fitness"
        },
        {
          time: "08:00 AM - 09:00 AM",
          title: "Bhajan Session",
          location: "Activity Hall",
          category: "Devotional"
        },
        {
          time: "11:00 AM - 12:00 PM",
          title: "Health Talk",
          location: "Activity Hall",
          category: "Wellness"
        },
        {
          time: "04:00 PM - 05:30 PM",
          title: "Indoor Games",
          location: "Recreation Room",
          category: "Recreation"
        },
        {
          time: "07:00 PM - 09:00 PM",
          title: "Evening Movie",
          location: "Mini Theatre",
          category: "Entertainment"
        }
      ]
    },

    // Screen 10: Certification Counselling
    counselling: {
      title: "Counseling Request",
      subtitle: "Get guidance on important certificates & documents.",
      items: [
        {
          id: "pension",
          title: "Pension Assistance",
          desc: "Guidance on pension-related certificates."
        },
        {
          id: "legal",
          title: "Property & Legal",
          desc: "Help with property, will, and legal documents."
        },
        {
          id: "schemes",
          title: "Government Schemes",
          desc: "Information about senior citizen schemes."
        },
        {
          id: "medical",
          title: "Medical Certificates",
          desc: "Assistance with medical certificates & reports."
        }
      ],
      requestButton: "Request Counselling"
    },

    // Screen 11: Services
    services: {
      title: "Services",
      items: [
        { id: "housekeeping", title: "Housekeeping Request" },
        { id: "laundry", title: "Laundry Request" },
        { id: "meal", title: "Meal Feedback" },
        { id: "transport", title: "Transport Request" },
        { id: "visitor", title: "Visitor Request" },
        { id: "general", title: "General Information" }
      ]
    },

    // Screen 12: Profile & Settings
    profileSettings: {
      title: "Profile & Settings",
      userName: "Shanti Devi",
      roomInfo: "Room 203, Lotus Block",
      menu: {
        personalProfile: "Personal Profile",
        healthRecords: "Health Records",
        emergencyContacts: "Emergency Contacts",
        notificationSettings: "Notification Settings",
        appLanguage: "App Language",
        languageValue: "English",
        helpSupport: "Help & Support",
        about: "About SeniorSphere"
      }
    },

    // Screen 13: My Community
    community: {
      title: "My Community",
      tabs: {
        residents: "Residents",
        staff: "Staff",
        family: "Family"
      },
      birthdaysTitle: "Birthdays This Month",
      birthdays: [
        { name: "Suresh Kumar", date: "24 May" },
        { name: "Lata Sharma", date: "28 May" }
      ],
      galleryTitle: "Gallery",
      viewAll: "View All"
    },

    // Showcase & Navigation Bar
    shell: {
      screenSelector: "Screens",
      screenFlow: "Flow View",
      mobileDevice: "Mobile Simulator",
      fullscreen: "Full Screen",
      switchLanguage: "Change Language"
    }
  },

  ta: {
    // App Brand
    appName: "SeniorSphere",
    tagline: "இணைந்த பராமரிப்பு. இனிய வாழ்வு.",
    heroTitle: "மூத்த குடிமக்களின் பாதுகாப்பு, ஆரோக்கியம் மற்றும் மகிழ்ச்சிக்கான முழுமையான டிஜிட்டல் தளம்.",
    quote: "இன்று அன்புடன் பராமரிப்பு, நாளை இனிய வாழ்வு.",
    values: {
      safe: "பாதுகாப்பு & நம்பிக்கை",
      happy: "ஆரோக்கியம் & மகிழ்ச்சி",
      community: "இணைந்த சமூகம்",
      empowered: "வலுவூட்டப்பட்ட வாழ்க்கை",
      trustedDesc: "உங்கள் தரவு பாதுகாப்பாக மற்றும் தனிப்பட்டதாக இருக்கும்.",
      supportDesc: "எப்போதும் உங்கள் கூடவே.",
      easyDesc: "எளிமையான, மூத்தவர்களுக்கு உகந்த வடிவமைப்பு.",
      careDesc: "ஏனெனில் நீங்கள் எங்களுக்கு முக்கியம்."
    },

    // Bottom Navigation
    nav: {
      home: "முகப்பு",
      community: "சமூகம்",
      alert: "அலெர்ட்",
      services: "சேவைகள்",
      more: "மேலும்"
    },

    // Screen 1: Onboarding
    onboarding: {
      title: "SeniorSphere",
      subtitle: "இணைந்த பராமரிப்பு.\nஇனிய வாழ்வு.",
      getStarted: "தொடங்கலாம்",
      alreadyAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
      login: "உள்நுழைய",
      languageToggle: "English"
    },

    // Screen 2: Add Resident Profile
    profileForm: {
      title: "குடியிருப்பாளர் விவரம்",
      infoBanner: "இந்த விவரங்கள் உங்களுக்கு சிறந்த சேவையை வழங்க உதவும்.",
      personalInfo: "தனிப்பட்ட தகவல்",
      fullName: "முழு பெயர்",
      dob: "பிறந்த தேதி",
      gender: "பாலினம்",
      genderFemale: "பெண்",
      genderMale: "ஆண்",
      bloodGroup: "இரத்த வகை",
      medicalInfo: "மருத்துவ தகவல்",
      medicalConditions: "மருத்துவ நிலை",
      allergies: "அலர்ஜி",
      noneAllergies: "எதுவும் இல்லை",
      currentMedications: "தற்போதைய மருந்துகள்",
      saveProfile: "விவரத்தை சேமிக்க",
      sampleName: "சண்முகம்",
      sampleDob: "15 ஆக., 1950",
      sampleConditions: "உயர் இரத்த அழுத்தம், சர்க்கரை",
      sampleMeds: "Amlodipine 5mg (காலை)\nMetformin 500mg (இரவு)"
    },

    // Screen 3: Emergency Alert
    sos: {
      title: "அவசர எச்சரிக்கை",
      needHelp: "உதவி வேண்டுமா?",
      instruction: "அலெர்ட் பட்டனை அழுத்தவும். உடனே எங்கள் குழுவிற்கு தெரிவிக்கப்படும்.",
      medicalEmergency: "மருத்துவ அவசரம்",
      callStaff: "ஊழியரை அழைக்கவும்",
      cancelAlert: "தவிர்க்க"
    },

    // Screen 4: Cancel Alert / In Progress
    alertProgress: {
      title: "அலர்ட் செயல்பாட்டில்",
      notifiedTeam: "எங்கள் குழுவிற்கு தெரிவிக்கப்பட்டது.",
      locationLabel: "இடம்",
      locationVal: "அறை 203, தாமரை மாடி",
      medicalLabel: "மருத்துவ தகவல்",
      medicalVal: "உயர் இரத்த அழுத்தம், சர்க்கரை",
      sharedLabel: "பகிரப்பட்டது",
      sharedVal: "ஊழியர், மருத்துவர், குடும்பம்",
      sharedFraction: "3/5",
      cancelPromptTitle: "இந்த அலர்ட்டை ரத்து செய்யவா?",
      cancelPromptDesc: "உங்கள் அலர்ட் ரத்து செய்யப்படும் மற்றும் குழுவிற்கு தெரிவிக்கப்படும்.",
      keepAlert: "அலர்ட்டை வைத்திருக்க",
      yesCancel: "ஆம், ரத்து செய்"
    },

    // Screen 5: Notification Sent (WhatsApp & SMS)
    notification: {
      title: "அறிவிப்பு அனுப்பப்பட்டது",
      tabWhatsapp: "WhatsApp",
      tabSms: "SMS",
      online: "ஆன்லைன்",
      alertHeadline: "அவசர எச்சரிக்கை - அறை 203",
      alertBody: "சண்முகம் அவர்களிடமிருந்து அவசர எச்சரிக்கை பெறப்பட்டது.",
      timeLabel: "நேரம்",
      timeVal: "20 மே 2024, 10:04 AM",
      locLabel: "இடம்",
      locVal: "அறை 203, தாமரை மாடி",
      medLabel: "மருத்துவம்",
      medVal: "உயர் இரத்த அழுத்தம், சர்க்கரை",
      sharedLabel: "பகிரப்பட்டது",
      sharedVal: "ஊழியர், மருத்துவர், குடும்பம்",
      viewOnMap: "வரைபடத்தில் பார்க்க",
      acknowledgedBy: "அறிவிக்கப்பட்டவர்கள்:",
      nurse: "நர்ஸ் கவிதா",
      nurseTime: "10:05 AM",
      doctor: "டியூட்டி மருத்துவர்",
      doctorTime: "10:06 AM",
      smsNote: "அவசர தொடர்புகளுக்கும் SMS அனுப்பப்பட்டது.",
      sentSuccess: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது."
    },

    // Screen 6: Complaint / Request
    complaint: {
      title: "புகார் பதிவு செய்யவும்",
      subtitle: "உங்கள் பிரச்சனையை தெரிவிக்கவும்",
      categories: {
        room: "அறை & வசதி",
        food: "உணவு",
        maintenance: "பராமரிப்பு",
        staff: "நடத்தை",
        health: "மருத்துவ உதவி",
        other: "மற்றவை"
      },
      descLabel: "விவரம்",
      descPlaceholder: "கழிவறை தண்ணீர் கசிகிறது.",
      addPhoto: "புகைப்படம் (விருப்பம்)",
      submit: "புகார் அனுப்பு",
      submittedToast: "புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது!"
    },

    // Screen 7: Complaint Status
    complaintStatus: {
      title: "என் புகார்கள்",
      tabs: {
        all: "அனைத்தும்",
        open: "திறந்தவை",
        inProgress: "நடப்பில்",
        resolved: "முடிந்தவை"
      },
      statusText: {
        inProgress: "நடப்பில்",
        resolved: "தீர்க்கப்பட்டது",
        open: "திறந்தவை"
      },
      items: [
        {
          id: "C-101",
          title: "கழிவறை தண்ணீர் கசிகிறது",
          date: "20 மே 2024, 09:15 AM",
          status: "in_progress",
          category: "அறை & வசதி"
        },
        {
          id: "C-102",
          title: "ஃபேன் இயங்கவில்லை",
          date: "18 மே 2024, 11:30 AM",
          status: "resolved",
          category: "பராமரிப்பு"
        },
        {
          id: "C-103",
          title: "உணவு உப்பு அதிகம்",
          date: "15 மே 2024, 01:45 PM",
          status: "resolved",
          category: "உணவு"
        },
        {
          id: "C-104",
          title: "படுக்கை விளக்கு எரியவில்லை",
          date: "10 மே 2024, 04:20 PM",
          status: "resolved",
          category: "அறை & வசதி"
        }
      ]
    },

    // Screen 8: Entertainment Hub
    entertainment: {
      title: "பொழுதுபோக்கு",
      heroTitle: "ஒவ்வொரு நாளும் மகிழ்ச்சி!",
      heroSubtitle: "படியுங்கள், கேளுங்கள், பாருங்கள், விளையாடுங்கள்.",
      explore: "விரைவான அணுகல்",
      modules: {
        music: "பாடல்கள்",
        movies: "திரைப்படங்கள்",
        audiobooks: "ஆடியோபுக்",
        games: "விளையாட்டுகள்",
        devotional: "ஆன்மீகம்",
        news: "செய்திகள்",
        brainGames: "மூளைப்பயிற்சி",
        liveTv: "நேரலை டிவி",
        activities: "நிகழ்வுகள்"
      }
    },

    // Screen 9: Daily Activities
    activities: {
      title: "இன்றைய நிகழ்வுகள்",
      date: "20 மே 2024, திங்கள்",
      items: [
        {
          time: "06:30 AM - 07:30 AM",
          title: "யோகா",
          location: "தோட்ட பகுதி",
          category: "ஆரோக்கியம்"
        },
        {
          time: "08:00 AM - 09:00 AM",
          title: "பஜன் அமர்வு",
          location: "செயல் அரங்கம்",
          category: "ஆன்மீகம்"
        },
        {
          time: "11:00 AM - 12:00 PM",
          title: "ஆரோக்கிய பேச்சு",
          location: "செயல் அரங்கம்",
          category: "ஆரோக்கியம்"
        },
        {
          time: "04:00 PM - 05:30 PM",
          title: "உட்புற விளையாட்டு",
          location: "பொழுதுபோக்கு அறை",
          category: "பொழுதுபோக்கு"
        },
        {
          time: "07:00 PM - 09:00 PM",
          title: "மாலை திரைப்படம்",
          location: "திரைப்பட அரங்கு",
          category: "திரைப்படம்"
        }
      ]
    },

    // Screen 10: Certification Counselling
    counselling: {
      title: "ஆலோசனை கோரிக்கை",
      subtitle: "முக்கிய சான்றிதழ்கள் மற்றும் ஆவணங்களுக்கு வழிகாட்டுதல் பெறுங்கள்.",
      items: [
        {
          id: "pension",
          title: "ஓய்வூதியம் உதவி",
          desc: "ஓய்வூதியம் தொடர்பான சான்றிதழ்கள் மற்றும் செயல்முறை"
        },
        {
          id: "legal",
          title: "சொத்து & சட்ட ஆலோசனை",
          desc: "சொத்து, உயில், சட்ட ஆவணங்களுக்கு வழிகாட்டல்"
        },
        {
          id: "schemes",
          title: "அரசு திட்டங்கள்",
          desc: "மூத்த குடிமக்கள் அரசு திட்டங்கள் மற்றும் சலுகைகள்"
        },
        {
          id: "medical",
          title: "மருத்துவ சான்றிதழ்கள்",
          desc: "மருத்துவ காப்பீடு, மருத்துவ சான்றிதழ்கள் மற்றும் அறிக்கைகள்"
        }
      ],
      requestButton: "ஆலோசனை கோரிக்கை செய்யவும்"
    },

    // Screen 11: Services
    services: {
      title: "சேவைகள்",
      items: [
        { id: "housekeeping", title: "துப்புரவு கோரிக்கை" },
        { id: "laundry", title: "துவைப்பக சேவை கோரிக்கை" },
        { id: "meal", title: "உணவு பின்னூட்டம்" },
        { id: "transport", title: "போக்குவரத்து கோரிக்கை" },
        { id: "visitor", title: "பார்வையாளர் கோரிக்கை" },
        { id: "general", title: "பொது தகவல்" }
      ]
    },

    // Screen 12: Profile & Settings
    profileSettings: {
      title: "என் சுயவிவரம்",
      userName: "சண்முகம்",
      roomInfo: "அறை 203, தாமரை மாடி",
      menu: {
        personalProfile: "தனிப்பட்ட விவரம்",
        healthRecords: "மருத்துவ பதிவுகள்",
        emergencyContacts: "அவசர தொடர்புகள்",
        notificationSettings: "அறிவிப்பு அமைப்புகள்",
        appLanguage: "மொழி",
        languageValue: "தமிழ்",
        helpSupport: "உதவி & ஆதரவு",
        about: "SeniorSphere பற்றி"
      }
    },

    // Screen 13: My Community
    community: {
      title: "என் சமூகம்",
      tabs: {
        residents: "குடியிருப்பாளர்கள்",
        staff: "ஊழியர்கள்",
        family: "குடும்பம்"
      },
      birthdaysTitle: "இந்த மாதம் பிறந்தநாள்கள்",
      birthdays: [
        { name: "சிவசுப்பிரமணியன்", date: "25 மே" },
        { name: "லலிதா", date: "28 மே" }
      ],
      galleryTitle: "புகைப்படங்கள்",
      viewAll: "அனைத்தையும் பார்க்க"
    },

    // Showcase & Navigation Bar
    shell: {
      screenSelector: "திரைகள்",
      screenFlow: "வரிசை முறை",
      mobileDevice: "மொபைல் முன்னோட்டம்",
      fullscreen: "முழுத்திரை",
      switchLanguage: "மொழி மாற்று"
    }
  }
};

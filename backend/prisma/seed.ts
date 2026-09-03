import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SeniorSphere PostgreSQL database...');

  // 1. Create or upsert primary resident (Shanti Devi / சண்முகம்)
  const existingResident = await prisma.resident.findFirst();
  let resident = existingResident;

  if (!resident) {
    resident = await prisma.resident.create({
      data: {
        nameEn: 'Shanti Devi',
        nameTa: 'சண்முகம்',
        dob: '15 Aug 1950',
        gender: 'Female',
        bloodGroup: 'B+',
        room: 'Room 203',
        block: 'Lotus Block',
        medicalConditions: 'Hypertension, Arthritis',
        allergies: 'None',
        currentMedications: 'Amlodipine 5mg (Morning), Calcium Tablet (Night)',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
      }
    });
    console.log(`Created Resident: ${resident.nameEn}`);
  }

  // 2. Seed Complaints matching Screen 7 (Complaint Status)
  const complaintCount = await prisma.complaint.count();
  if (complaintCount === 0) {
    await prisma.complaint.createMany({
      data: [
        {
          residentId: resident.id,
          categoryKey: 'room',
          titleEn: 'Bathroom tap leaking',
          titleTa: 'கழிவறை தண்ணீர் கசிகிறது',
          descriptionEn: 'The bathroom tap is leaking since yesterday.',
          descriptionTa: 'கழிவறை தண்ணீர் கசிகிறது.',
          status: 'in_progress',
          photoUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=80'
        },
        {
          residentId: resident.id,
          categoryKey: 'maintenance',
          titleEn: 'Fan not working',
          titleTa: 'ஃபேன் இயங்கவில்லை',
          descriptionEn: 'Fan makes noise and does not rotate.',
          descriptionTa: 'ஃபேன் சுற்றவில்லை மற்றும் சத்தம் வருகிறது.',
          status: 'resolved'
        },
        {
          residentId: resident.id,
          categoryKey: 'food',
          titleEn: 'Food is too salty',
          titleTa: 'உணவு உப்பு அதிகம்',
          descriptionEn: 'Lunch sambar had excess salt.',
          descriptionTa: 'மதிய உணவில் உப்பு அதிகமாக இருந்தது.',
          status: 'resolved'
        },
        {
          residentId: resident.id,
          categoryKey: 'room',
          titleEn: 'Bed side light not working',
          titleTa: 'படுக்கை விளக்கு எரியவில்லை',
          descriptionEn: 'Reading light bulb needs replacement.',
          descriptionTa: 'படுக்கை அருகில் உள்ள விளக்கு எரியவில்லை.',
          status: 'resolved'
        }
      ]
    });
    console.log('Seeded initial complaints.');
  }

  // 3. Seed Daily Activities for Screen 9 (Daily Activities)
  const activityCount = await prisma.activity.count();
  if (activityCount === 0) {
    await prisma.activity.createMany({
      data: [
        {
          titleEn: 'Morning Yoga',
          titleTa: 'யோகா',
          time: '06:30 AM - 07:30 AM',
          locationEn: 'Garden Area',
          locationTa: 'தோட்ட பகுதி',
          category: 'Health & Fitness',
          date: '2024-05-20'
        },
        {
          titleEn: 'Bhajan Session',
          titleTa: 'பஜன் அமர்வு',
          time: '08:00 AM - 09:00 AM',
          locationEn: 'Activity Hall',
          locationTa: 'செயல் அரங்கம்',
          category: 'Devotional',
          date: '2024-05-20'
        },
        {
          titleEn: 'Health Talk',
          titleTa: 'ஆரோக்கிய பேச்சு',
          time: '11:00 AM - 12:00 PM',
          locationEn: 'Activity Hall',
          locationTa: 'செயல் அரங்கம்',
          category: 'Wellness',
          date: '2024-05-20'
        },
        {
          titleEn: 'Indoor Games',
          titleTa: 'உட்புற விளையாட்டு',
          time: '04:00 PM - 05:30 PM',
          locationEn: 'Recreation Room',
          locationTa: 'பொழுதுபோக்கு அறை',
          category: 'Recreation',
          date: '2024-05-20'
        },
        {
          titleEn: 'Evening Movie',
          titleTa: 'மாலை திரைப்படம்',
          time: '07:00 PM - 09:00 PM',
          locationEn: 'Mini Theatre',
          locationTa: 'திரைப்பட அரங்கு',
          category: 'Entertainment',
          date: '2024-05-20'
        }
      ]
    });
    console.log('Seeded daily activities.');
  }

  // 4. Seed Community Birthdays for Screen 13 (My Community)
  const birthdayCount = await prisma.communityBirthday.count();
  if (birthdayCount === 0) {
    await prisma.communityBirthday.createMany({
      data: [
        {
          nameEn: 'Suresh Kumar',
          nameTa: 'சிவசுப்பிரமணியன்',
          date: '24 May',
          role: 'Resident',
          photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
        },
        {
          nameEn: 'Lata Sharma',
          nameTa: 'லலிதா',
          date: '28 May',
          role: 'Resident',
          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        }
      ]
    });
    console.log('Seeded community birthdays.');
  }

  // 5. Seed Gallery Items for Screen 13
  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    await prisma.galleryItem.createMany({
      data: [
        {
          titleEn: 'Morning Stroll',
          titleTa: 'காலை நடைப்பயிற்சி',
          photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&auto=format&fit=crop&q=80'
        },
        {
          titleEn: 'Music Afternoon',
          titleTa: 'இசை அரங்கம்',
          photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80'
        },
        {
          titleEn: 'Community Garden',
          titleTa: 'தோட்டக்கலை',
          photoUrl: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=300&auto=format&fit=crop&q=80'
        },
        {
          titleEn: 'Festival Gathering',
          titleTa: 'பண்டிகை கொண்டாட்டம்',
          photoUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=300&auto=format&fit=crop&q=80'
        }
      ]
    });
    console.log('Seeded gallery items.');
  }

  console.log('SeniorSphere PostgreSQL database seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

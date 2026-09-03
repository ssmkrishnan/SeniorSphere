import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Ensuring essential system catalog data in PostgreSQL database...');

  // Seed Daily Activities schedule if empty
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
    console.log('Seeded schedule catalog.');
  }

  console.log('SeniorSphere catalog initialized. Resident profiles, complaints, and alerts are ready for user input.');
}

main()
  .catch(e => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

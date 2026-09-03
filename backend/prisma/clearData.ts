import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAll() {
  console.log('Clearing all dummy data from SeniorSphere PostgreSQL database...');

  // Delete in proper relational foreign-key order
  const acks = await prisma.staffAcknowledgement.deleteMany({});
  console.log(`Deleted ${acks.count} staff acknowledgements.`);

  const alerts = await prisma.emergencyAlert.deleteMany({});
  console.log(`Deleted ${alerts.count} emergency alerts.`);

  const complaints = await prisma.complaint.deleteMany({});
  console.log(`Deleted ${complaints.count} complaints.`);

  const services = await prisma.serviceRequest.deleteMany({});
  console.log(`Deleted ${services.count} service requests.`);

  const counsellings = await prisma.counsellingRequest.deleteMany({});
  console.log(`Deleted ${counsellings.count} counselling requests.`);

  const residents = await prisma.resident.deleteMany({});
  console.log(`Deleted ${residents.count} residents.`);

  console.log('Database successfully wiped clean! Ready for user input.');
}

clearAll()
  .catch(e => {
    console.error('Error clearing data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

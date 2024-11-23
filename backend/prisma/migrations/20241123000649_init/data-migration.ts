import { PrismaClient } from '@prisma/client';
import { driversData } from '../../driversData';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const drivers = await tx.driver.findMany();

    if (drivers.length === 0) {
      await tx.driver.createMany({
        data: driversData,
      });
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());

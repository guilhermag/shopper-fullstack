import { PrismaClient, Driver } from '@prisma/client';

const prisma = new PrismaClient();

class DriverModel {
  async getById(id: number): Promise<Driver | null> {
    return await prisma.driver.findUnique({ where: { id } });
  }

  async getAll(): Promise<Driver[]> {
    return await prisma.driver.findMany();
  }
}

export default new DriverModel();

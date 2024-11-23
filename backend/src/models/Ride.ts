import { PrismaClient, Ride } from '@prisma/client';

const prisma = new PrismaClient();

class RideModel {
  async create(data: Ride): Promise<Ride> {
    return await prisma.ride.create({ data });
  }

  async getById(id: number): Promise<Ride | null> {
    return await prisma.ride.findUnique({ where: { id } });
  }
}

export default new RideModel();

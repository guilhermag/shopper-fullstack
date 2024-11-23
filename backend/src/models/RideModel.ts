import { PrismaClient, Ride } from '@prisma/client';
import { CreateRide } from '../shared/types/ride';

const prisma = new PrismaClient();

class RideModel {
  async create(data: CreateRide): Promise<Ride> {
    return await prisma.ride.create({
      data: {
        destination: data.destination,
        distance: data.distance,
        origin: data.origin,
        customerId: 1,
        driverId: data.driverId,
      },
    });
  }

  async getById(id: number): Promise<Ride | null> {
    return await prisma.ride.findUnique({ where: { id } });
  }
}

export default new RideModel();

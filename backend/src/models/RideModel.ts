import { PrismaClient, Ride } from '@prisma/client';
import { CreateRide } from '../shared/types/ride';
import CustomerModel from './CustomerModel';

const prisma = new PrismaClient();

class RideModel {
  async create(data: CreateRide): Promise<Ride> {
    const customer = await CustomerModel.getByCustomerId(data.customerId);
    return await prisma.ride.create({
      data: {
        destination: data.destination,
        distance: data.distance,
        origin: data.origin,
        customerId: customer!.id,
        driverId: data.driverId,
      },
    });
  }

  async getById(id: number): Promise<Ride | null> {
    return await prisma.ride.findUnique({ where: { id } });
  }

  async getRideByCustomerOrDriver(customerId: string, driverId?: number) {
    const customer = await CustomerModel.getByCustomerId(customerId);
    if (!!driverId && customer) {
      return await prisma.ride.findMany({
        where: { customerId: customer.id, driverId: driverId },
        orderBy: {},
      });
    }
  }
}

export default new RideModel();

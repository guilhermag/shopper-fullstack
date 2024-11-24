import { PrismaClient, Ride } from '@prisma/client';
import { CreateRide } from '../shared/types/ride';
import CustomerModel from './CustomerModel';
import moment from 'moment-timezone';

const prisma = new PrismaClient();

class RideModel {
  async create(data: CreateRide): Promise<Ride> {
    const customer = await CustomerModel.getByCustomerId(data.customerId);
    const saoPauloDate = moment();
    return await prisma.ride.create({
      data: {
        destination: data.destination,
        distance: data.distance,
        origin: data.origin,
        customerId: customer!.id,
        driverId: data.driverId,
        duration: data.duration,
      },
    });
  }

  async getById(id: number): Promise<Ride | null> {
    return await prisma.ride.findUnique({ where: { id } });
  }

  async getRideByCustomerOrDriver(customerId: string, driverId?: number): Promise<Ride[]> {
    const customer = await CustomerModel.getByCustomerId(customerId);
    let rides: Ride[] = [];
    if (!!driverId && customer) {
      rides = await prisma.ride.findMany({
        where: { customerId: customer.id, driverId: driverId },
        orderBy: { createdAt: 'desc' },
      });
    } else if (customer) {
      rides = await prisma.ride.findMany({
        where: { customerId: customer.id },
        orderBy: { createdAt: 'desc' },
      });
    }
    return rides;
  }
}

export default new RideModel();

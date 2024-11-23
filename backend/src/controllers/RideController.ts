// src/controllers/RideController.ts

import { Request, Response } from 'express';

import RideService from '../services/RideService';
import DriverModel from '../models/DriverModel';
import { metersToKm } from '../shared/utils/utils';

class RideController {
  async estimate(req: Request, res: Response): Promise<void> {
    try {
      const { origin, destination, customerId } = req.body;
      await checkRequisitionError(origin, destination, customerId, 'estimate');
      res.json(await RideService.estimate(origin, destination, customerId));
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: error.message,
        });
      } else {
        res.status(400).json({
          error_code: 'UNKNOWN_ERROR',
        });
      }
    }
  }

  async confirm(req: Request, res: Response): Promise<void> {
    try {
      const { customerId, driverId, origin, destination } = req.body;
      await checkRequisitionError(origin, destination, customerId, 'confirm', driverId);
      // const distance = await RideService.calculateDistance(origin, destination);
      // const duration = await RideService.calculateDuration(origin, destination);
      // const driver = Driver.getDriverById(driverId);
      // if (!driver) {
      //   return res.status(404).json({ error: 'Motorista não encontrado' });
      // }
      // const value = RideService.calculatePrice(distance, driver.rate, driver.min_km);
      // // Criar a corrida no banco de dados (opcional)
      // const rideData: Ride = {
      //   id: 0, // O Prisma irá gerar o ID automaticamente
      //   customerId: parseInt(customerId),
      //   driverId: driverId,
      //   origin,
      //   destination,
      //   distance,
      //   duration,
      //   value,
      //   status: 'confirmed', // ou outro status inicial
      //   startTime: new Date(),
      //   endTime: null,
      //   paymentMethod: 'cash', // ou outro método de pagamento
      // };
      // const createdRide = await RideService.createRide(rideData);
      res.json({ ride: 'createdRide' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: error.message,
        });
      } else {
        res.status(400).json({
          error_code: 'UNKNOWN_ERROR',
        });
      }
    }
  }

  async getRidesByCustomerId(req: Request, res: Response): Promise<void> {
    try {
      // const customerId = parseInt(req.params.customerId);
      // const rides = await RideService.getRidesByCustomerId(customerId);
      // res.json({ rides });
    } catch (error) {
      console.error('Erro ao buscar corridas:', error);
      res.status(500).json({ error: 'Erro ao buscar corridas' });
    }
  }
}

const checkRequisitionError = async (
  origin: string,
  destination: string,
  customerId: string,
  req: string,
  driverId?: number
) => {
  if (!customerId) {
    throw new Error('Customer ID must be specified');
  }

  if (req === 'estimate' || req === 'confirm') {
    if (!origin || !destination || origin.trim() === '' || destination.trim() === '') {
      throw new Error('Origin and destination must be specified and cannot be blank');
    }

    if (origin === destination) {
      throw new Error('Origin and destination must be different');
    }

    if (req === 'confirm') {
      if (!driverId) {
        throw new Error('Driver Id must be informed');
      }

      const driver = await DriverModel.getById(driverId);
      if (!driver) {
        throw new Error('Driver Id must be valid');
      }

      let distance = 0;
      const cache = RideService.cacheService.getCache();
      let selectedCache;
      if (cache.length > 0) {
        const cacheAux = cache.filter((cache) => {
          return (
            cache.source === 'estimate' &&
            cache.result['customerId'] === customerId &&
            cache.result['origin'] === origin &&
            cache.result['destination'] === destination
          );
        });
        if (cacheAux.length > 1) {
          selectedCache = cacheAux.pop();
        } else {
          selectedCache = cacheAux[0];
        }
        console.log(selectedCache);
      }
      if (driver && distance && metersToKm(distance) < driver.minKm) {
        throw new Error('Invalid mileage for the driver');
      }
    }
  }
};

export default new RideController();

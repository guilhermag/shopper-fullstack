// src/controllers/RideController.ts

import { Request, Response } from 'express';

import RideService from '../services/RideService';
import DriverModel from '../models/DriverModel';
import { metersToKm } from '../shared/utils/utils';
import RideModel from '../models/RideModel';
import CustomerModel from '../models/CustomerModel';

class RideController {
  async estimate(req: Request, res: Response): Promise<void> {
    try {
      const { origin, destination } = req.body;
      const customerId = req.body['customer_id'];
      await checkRequisitionError(origin, destination, customerId, 'estimate');
      const customer = await CustomerModel.getByCustomerId(customerId);
      if (!customer) {
        await CustomerModel.create(customerId);
      }
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
      // {
      //   "customer_id": "3423",
      //   "origin": "Max atacadista, Arapongas, Paraná",
      //   "destination": "rua joão de barro, 92, Arapongas, Paraná",
      //   "distance": 1,
      //   "duration": "",
      //   "driver": {
      //     "id": 1,
      //     "name": ""
      //   },
      //   "value": 1
      // }
      const customerId = req.body['customer_id'];
      const { origin, destination, distance, duration, driver, value } = req.body;
      await checkRequisitionError(origin, destination, customerId, 'confirm', driver['id']);

      await RideModel.create({
        customerId,
        destination,
        distance,
        driverId: driver['id'],
        origin,
      });
      res.json({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Driver not found') {
          res.status(404).json({
            error_code: 'DRIVER_NOT_FOUND',
            error_description: error.message,
          });
        } else if (error.message === 'Invalid mileage for the driver') {
          res.status(406).json({
            error_code: 'INVALID_DISTANCE',
            error_description: error.message,
          });
        } else {
          res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: error.message,
          });
        }
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
        throw new Error('Driver not found');
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

        distance = selectedCache ? selectedCache.result['distance'] : 0;
      }

      if (driver && distance && metersToKm(distance) < driver.minKm) {
        throw new Error('Invalid mileage for the driver');
      }

      if (!selectedCache) {
        throw new Error('Route not found');
      }
    }
  }
};

export default new RideController();

import axios from 'axios';
import { API_URL, FIELD_MASK_API } from '../shared/constants/ride';
import { DriverRide, Estimate, RideData, RideMap, RideResponse } from '../shared/types/ride';
import { RouteResponse } from '../shared/types/estimate';
import * as _ from 'lodash';
import DriverModel from '../models/DriverModel';
import { isEmpty, metersToKm } from '../shared/utils/utils';
import { Driver, Ride } from '@prisma/client';
import { CacheService } from './CacheService';
import moment from 'moment-timezone';
import CustomerModel from '../models/CustomerModel';
class RideService {
  cacheService: CacheService;
  constructor() {
    this.cacheService = new CacheService();
  }

  instance = axios.create({
    baseURL: API_URL,
    timeout: 4000,
    headers: {
      'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
      'X-Goog-FieldMask': FIELD_MASK_API,
    },
  });

  async estimate(origin: string, destination: string, customerId: string): Promise<RideData> {
    let response = await this.instance.post('/', {
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
      },
    });
    if (isEmpty(response.data)) {
      throw new Error('Route not found, invalid origin or destination');
    }
    const routeResponse: RouteResponse = response.data;
    const estimate: Estimate = this.mapResponse(routeResponse);
    const res = await this.estimateDrivers(estimate);
    this.cacheService.add({
      source: 'estimate',
      result: { distance: res.distance, origin, destination, customerId },
    });
    return res;
  }

  async estimateDrivers(estimate: Estimate): Promise<RideData> {
    const drivers = await DriverModel.getAll();
    const est = _.cloneDeep(estimate);
    const distance = metersToKm(estimate.distance);
    const driversSelected = drivers.filter((driver) => {
      return distance >= driver.minKm;
    });
    return { ...est, options: this.mapDrivers(driversSelected, distance) };
  }

  private mapResponse(data: RouteResponse): Estimate {
    return {
      origin: {
        latitude: data.routes[0].legs[0].startLocation.latLng.latitude,
        longitude: data.routes[0].legs[0].startLocation.latLng.longitude,
      },
      destination: {
        latitude: data.routes[0].legs[0].endLocation.latLng.latitude,
        longitude: data.routes[0].legs[0].endLocation.latLng.longitude,
      },
      distance: data.routes[0].distanceMeters,
      duration: data.routes[0].duration,
      routeResponse: _.cloneDeep(data),
    };
  }

  private mapDrivers(data: Driver[], distance: number): DriverRide[] {
    const drivers: DriverRide[] = data.map((driver) => {
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: { rating: driver.rating, comment: driver.description },
        value: driver.rate * distance,
      };
    });
    return drivers.sort((a, b) => a.value - b.value);
  }

  async mapRides(data: Ride[]) {
    const customer = await CustomerModel.getById(data[0].customerId);
    const ridePromises = data.map(async (ride) => {
      const driver = await DriverModel.getById(ride.driverId);
      return {
        id: ride.id,
        date: ride.createdAt,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: { id: driver!.id, name: driver!.name },
        value: ride.value,
      };
    });

    const rideMap = await Promise.all(ridePromises);

    return {
      customer_id: customer!.customer_id,
      rides: rideMap,
    };
  }
}

export default new RideService();

import axios from 'axios';
import { API_URL, FIELD_MASK_API } from '../shared/constants/ride';
import { DriverRide, Estimate, RideData } from '../shared/types/ride';
import { RouteResponse } from '../shared/types/estimate';
import * as _ from 'lodash';
import DriverModel from '../models/DriverModel';
import { isEmpty, metersToKm } from '../shared/utils/utils';
import { Driver } from '@prisma/client';
import { CacheService } from './CacheService';
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
    const drivers = res.options.map((driver) => driver.id);
    this.cacheService.add({
      source: 'estimate',
      result: { distance: res.distance, origin, destination, customerId, drivers },
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
}

export default new RideService();

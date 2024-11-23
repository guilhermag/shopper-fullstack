import axios from 'axios';
import { API_URL, FIELD_MASK_API } from '../shared/constants/ride';
import { DriverRide, Estimate, RideData } from '../shared/types/ride';
import { RouteResponse } from '../shared/types/estimate';
import * as _ from 'lodash';
import DriverModel from '../models/DriverModel';
import { isEmpty, metersToKm } from '../shared/utils/utils';
import { Driver } from '@prisma/client';
interface Req {
  source: string;
  result: any;
}

export class CacheService {
  private cache: Req[] = [];

  add(data: Req) {
    this.cache.push(data);
  }

  getCache() {
    return this.cache;
  }

  clearCache() {
    this.cache = [];
  }
}

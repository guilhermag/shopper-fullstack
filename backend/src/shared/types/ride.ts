import { Ride } from '@prisma/client';
import { LatLng, RouteResponse } from './estimate';

interface RideData extends Estimate {
  options: DriverRide[];
}

interface Estimate {
  origin: LatLng;
  destination: LatLng;
  distance: number;
  duration: string;
  routeResponse: RouteResponse;
}

interface DriverRide {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

interface CreateRide {
  customerId: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driverId: number;
  value: number;
}

interface RideResponse {
  customer_id: string;
  rides: RideMap[];
}

interface RideMap {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}

interface Driver {
  id: number;
  name: string;
}

export { RideData, Estimate, DriverRide, CreateRide, RideResponse, RideMap };

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
}

export { RideData, Estimate, DriverRide, CreateRide };

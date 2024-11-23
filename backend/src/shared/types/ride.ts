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

export { RideData, Estimate, DriverRide };

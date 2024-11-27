import { Driver } from './types';

export interface EstimateResponse {
  origin: LatLng;
  destination: LatLng;
  distance: number;
  duration: string;
  options: Driver[];
  routeResponse: RouteResponse;
}

interface RouteResponse {
  routes: Route[];
}

interface Route {
  legs: Leg[];
  distanceMeters: number;
  duration: string;
}
interface Leg {
  startLocation: LocationLat;
  endLocation: LocationLat;
}
interface LocationLat {
  latLng: LatLng;
}
interface LatLng {
  latitude: number;
  longitude: number;
}

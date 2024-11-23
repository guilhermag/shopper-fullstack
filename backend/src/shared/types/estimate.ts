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

export { RouteResponse, LatLng };

const API_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const FIELD_MASK_API =
  'routes.distanceMeters,routes.duration,routes.legs.startLocation,routes.legs.endLocation';

export { API_URL, FIELD_MASK_API };

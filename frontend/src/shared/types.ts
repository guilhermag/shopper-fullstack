export interface Driver {
    id: number;
    name: string;
    description: string;
    car: string;
    rating: number;
    rate: number;
    minKm: number;
  }
  
  export interface RideEstimate {
    driver: Driver;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
  }
  
  export interface Ride {
    id: number;
    customerId: number;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }
  
  export interface RidesByCustomerResponse {
    rides: Ride[];
  }
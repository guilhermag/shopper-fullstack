import axios from 'axios';
import { RideEstimate, Ride, RidesByCustomerResponse } from '../shared/types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const estimateRide = async (customerId: string, origin: string, destination: string) => {
  const response = await api.post('/ride/estimate', {
    customer_id: customerId,
    origin,
    destination,
  });
  return response.data as { createdCustomerId?: string; estimates: RideEstimate[] };
};

export const confirmRide = async (data: {
  customer_id: string;
  driverId: number;
  origin: string;
  destination: string;
}) => {
  const response = await api.patch('/ride/confirm', data);
  return response.data as Ride;
};

export const getRidesByCustomer = async (customerId: string, driverId?: number) => {
  const response = await api.get<RidesByCustomerResponse>(`/ride/${customerId}`, {
    params: { driver_id: driverId },
  });
  return response.data;
};

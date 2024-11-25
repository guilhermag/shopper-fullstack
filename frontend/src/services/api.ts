import axios from 'axios';
import { RideEstimate, Ride, RidesByCustomerResponse } from '../shared/types';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const estimateRide = async (customerId: string, origin: string, destination: string) => {
  const response = await api.post('/rides/estimate', {
    customerId,
    origin,
    destination,
  });
  return response.data as { createdCustomerId?: string, estimates: RideEstimate[] };
};

export const confirmRide = async (data: { customerId: string; driverId: number, origin: string, destination: string }) => {
  const response = await api.patch('/rides/confirm', data);
  return response.data as Ride;
};

export const getRidesByCustomer = async (customerId: string, driverId?: number) => {
  const response = await api.get<RidesByCustomerResponse>(`/rides/${customerId}`, {
    params: { driver_id: driverId },
  });
  return response.data;
};
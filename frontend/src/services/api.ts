import axios from 'axios';
import { RideConfirmation, RidesByCustomerResponse } from '../shared/types';
import { EstimateResponse } from '../shared/responseTypes';
import moment from 'moment-timezone';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const estimateRide = async (customerId: string, origin: string, destination: string) => {
  let response: EstimateResponse;
  await api
    .post('/ride/estimate', {
      customer_id: customerId,
      origin,
      destination,
    })
    .then((resEstimate) => {
      response = resEstimate.data;
    });
  return response!;
};

export const confirmRide = async (data: RideConfirmation) => {
  const response = await api.patch('/ride/confirm', data);
  return response;
};

export const getRidesByCustomer = async (customerId: string, driverId?: number) => {
  const response = await api.get<RidesByCustomerResponse>(`/ride/${customerId}`, {
    params: { driver_id: driverId },
  });

  response.data.rides.forEach((ride) => {
    const date = moment(ride.date);
    ride.date = date.format('DD/MM/YYYY HH:mm:ss');
  });

  return response.data;
};

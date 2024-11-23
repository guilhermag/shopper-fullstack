import DriverModel from '../../models/DriverModel';

const metersToKm = (unit: number) => {
  return unit / 1000;
};

const isEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

const checkRequisitionError = async (
  origin: string,
  destination: string,
  customerId: string,
  req: string,
  driverId?: number,
  distance?: number
) => {
  if (!customerId) {
    throw new Error('Customer ID must be specified');
  }

  if (req === 'estimate' || req === 'confirm') {
    if (!origin || !destination || origin.trim() === '' || destination.trim() === '') {
      throw new Error('Origin and destination must be specified and cannot be blank');
    }

    if (origin === destination) {
      throw new Error('Origin and destination must be different');
    }

    if (req === 'confirm') {
      if (!driverId) {
        throw new Error('Driver Id must be informed');
      }

      const driver = await DriverModel.getById(driverId);
      if (!driver) {
        throw new Error('Driver Id must be valid');
      }

      if (driver && distance && metersToKm(distance) < driver.minKm) {
        throw new Error('Invalid mileage for the driver');
      }
    }
  }
};

export { metersToKm, isEmpty, checkRequisitionError };

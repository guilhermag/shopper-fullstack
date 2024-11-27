import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RideOptions from '../components/RideOptions';
import { confirmRide } from '../services/api';
import { EstimateResponse } from '../shared/responseTypes';
import { RideConfirmation } from '../shared/types';
import NotFound from '../components/NotFound';

const RideOptionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimate, customerId, origin, destination } = (location.state as {
    estimate: EstimateResponse;
    customerId: string;
    origin: string;
    destination: string;
  }) || { estimate: undefined, customerId: '', origin: '', destination: '' };
  const directions = { origin, destination };
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async (driver: { id: number; name: string; value: number }) => {
    setIsConfirming(true);

    const confirmation: RideConfirmation = {
      customer_id: customerId,
      origin,
      destination,
      duration: estimate.duration,
      distance: estimate.distance,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value,
    };
    await confirmRide(confirmation);
    navigate('/ride-history', { state: { customerId } });
  };

  return (
    <div>
      {estimate ? (
        <div>
          <div className='bg-gray-100 p-4 shadow-md rounded-md'>
            <div className='container mx-auto flex items-center justify-between'>
              <button
                onClick={() => navigate('/')}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Voltar
              </button>
              <div className='flex flex-col items-center'>
                {' '}
                {/* Centralizar título e parágrafo */}
                <h1 className='text-xl font-bold'>Opções de Viagem</h1>
                <p className='text-gray-600 text-sm'>
                  De: {directions.origin} <br />
                  Para: {directions.destination}
                </p>
              </div>
              <div className='w-4'></div> {/* Espaçamento à direita */}
            </div>
            <hr className='my-4' />
          </div>
          <RideOptions estimate={estimate} directions={directions} onConfirm={handleConfirm} />
          {isConfirming && <p>Confirmando viagem...</p>}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default RideOptionsPage;

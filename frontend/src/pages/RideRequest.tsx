import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RideRequestForm from '../components/RideRequestForm';
import { estimateRide } from '../services/api';
import Alert from '../components/Alert';
import { AxiosError } from 'axios';

const RideRequest = () => {
  const alertDefault = 'A Origem e Destino não podem ser iguais';
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(alertDefault);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (origin === destination) {
      setShowAlert(true);
      setAlertMessage(alertDefault);
    } else {
      try {
        setShowAlert(false);
        const estimate = await estimateRide(customerId, origin, destination);

        navigate('/ride-options', {
          state: { estimate: estimate, customerId, origin, destination },
        });
      } catch (err: unknown) {
        if (err instanceof Error && err instanceof AxiosError) {
          const errResponse = err.response?.data;
          if (
            errResponse.error_code === 'INVALID_DATA' &&
            errResponse.error_description === 'Route not found, invalid origin or destination'
          ) {
            setShowAlert(true);
            setAlertMessage('Origem ou Destino inválidos, informe um endereço válido');
          }
        } else {
          throw err;
        }
      }
    }
  };

  return (
    <div>
      <section className='flex w-full justify-center bg-gray-100 '>
        <div className='bg-white w-1/2 shadow-md rounded-md mb-4 p-2'>
          <h2 className='text-xl font-bold mb-4'>Instruções</h2>
          <ul className='list-disc pl-5'>
            <li className='text-sm'>Informe o ID do usuário.</li>
            <li className='text-sm'>Caso o usuário não exista, o seu registro será criado.</li>
            <li className='text-sm'>Preencha o endereço de origem e destino da viagem.</li>
            <li className='text-sm'>Clique em "Estimar Valor" para calcular o valor da viagem.</li>
            <li className='text-sm'>
              Após estimar o valor, você poderá escolher o motorista e confirmar a viagem.
            </li>
            <li className='text-sm'>
              Acesse o histórico de viagens para visualizar suas viagens anteriores.
            </li>
          </ul>
        </div>
      </section>
      <div className='flex flex-col items-center justify-center bg-gray-100 '>
        {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
        <div className=' bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h1 className='font-bold text-xl '>Solicitação de Viagem </h1>
          <RideRequestForm
            customerId={customerId}
            setCustomerId={setCustomerId}
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
            onSubmit={handleSubmit}
          />
          <button
            onClick={() => navigate('/ride-history')}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Histórico de viagens
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideRequest;

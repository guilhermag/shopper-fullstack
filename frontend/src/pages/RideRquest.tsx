import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RideRequestForm from '../components/RideRequestForm';
import { estimateRide } from '../services/api';

const RideRequest = () => {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const estimates = await estimateRide(customerId, origin, destination);

      // Verificar se o customer_id foi criado
      if (estimates.createdCustomerId) {
        alert(`Usuário com ID ${estimates.createdCustomerId} não encontrado e foi criado.`);
        setCustomerId(estimates.createdCustomerId); // Atualiza o customerId no estado
      }

      navigate('/ride-options', {
        state: { estimates: estimates.estimates, customerId, origin, destination },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 '>
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
        {isLoading && <p>Carregando estimativas...</p>}
        {error && <p>Erro: {error}</p>}
      </div>
    </div>
  );
};

export default RideRequest;

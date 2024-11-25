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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Solicitação de Viagem</h1>
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
  );
};

export default RideRequest;
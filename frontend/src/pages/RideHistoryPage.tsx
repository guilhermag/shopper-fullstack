import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RideHistory from '../components/RideHistory';
import { getRidesByCustomer } from '../services/api';
import { Ride } from '../shared/types';

const RideHistoryPage = () => {
  const location = useLocation();
  const { ride, customerId: customerIdProp } = location.state as { ride: Ride, customerId: string };
  const [customerId, setCustomerId] = useState(customerIdProp);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRides = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getRidesByCustomer(customerId, driverId!);
        setRides(data.rides);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId) {
      fetchRides();
    }
  }, [customerId, driverId]);

  useEffect(() => {
    if (ride) {
      setCustomerId(ride.customerId.toString());
    }
  }, [ride]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDriverId(event.target.value === '' ? null : parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h1>Histórico de Viagens</h1>
      <div>
        <input
          type="text"
          placeholder="ID do Usuário"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <select onChange={handleFilterChange}>
          <option value="">Todos os Motoristas</option>
          {/* Mapear motoristas aqui */}
        </select>
      </div>
      {isLoading && <p>Carregando histórico...</p>}
      {error && <p>Erro: {error}</p>}
      <RideHistory rides={rides} />
    </div>
  );
};

export default RideHistoryPage;
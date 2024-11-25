import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RideOptions from '../components/RideOptions';
import { confirmRide } from '../services/api';
import { RideEstimate } from '../shared/types';

const RideOptionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimates, customerId, origin, destination } = location.state as {
    estimates: RideEstimate[];
    customerId: string;
    origin: string;
    destination: string;
  };
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async (driverId: number) => {
    setIsConfirming(true);
    setError(null);

    try {
      const ride = await confirmRide({ customerId, driverId, origin, destination });
      navigate('/ride-history', { state: { ride, customerId } });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div>
      <h1>Opções de Viagem</h1>
      <RideOptions estimates={estimates} onConfirm={handleConfirm} />
      {isConfirming && <p>Confirmando viagem...</p>}
      {error && <p>Erro: {error}</p>}
    </div>
  );
};

export default RideOptionsPage;
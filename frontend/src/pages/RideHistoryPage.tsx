import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RideHistory from '../components/RideHistory';
import { getRidesByCustomer } from '../services/api';
import { Ride } from '../shared/types';
import { AxiosError } from 'axios';

const RideHistoryPage = () => {
  const location = useLocation();
  const { customerId: customerIdProp } = location.state || { customerIdProp: '' };
  const [customerId, setCustomerId] = useState(customerIdProp);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [showTable, setShowTable] = useState(true);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDriverId(event.target.value === '' ? null : parseInt(event.target.value, 10));
  };

  const fetchRides = async () => {
    try {
      const data = await getRidesByCustomer(customerId, driverId!);
      setRides(data.rides);
    } catch (err: unknown) {
      if (err instanceof Error && err instanceof AxiosError) {
        const errResponse = err.response?.data?.error_code;
        if (errResponse === 'NO_RIDES_FOUND') {
          setShowTable(false);
        }
      } else {
        throw err;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchRides();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (customerId) {
      fetchRides();
    }
  }, []);

  return (
    <div>
      <div className='bg-gray-100 p-4 shadow-md rounded-md'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
          <button
            onClick={() => navigate('/')}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Voltar
          </button>
          <div className='flex flex-col items-center'>
            <h1 className='text-xl font-bold'>Histórico de Viagens</h1>
          </div>
          <form onSubmit={handleSubmit} className='mt-4 md:mt-0'>
            <div className='flex items-center'>
              <input
                type='text'
                placeholder='ID do Usuário'
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
                className='mr-2 border border-gray-400 rounded px-2 py-1'
              />
              <select
                onChange={handleFilterChange}
                className='mr-2 border border-gray-400 rounded px-2 py-1'
              >
                <option value=''>Todos os Motoristas</option>
                <option value='1'>Homer Simpson</option>
                <option value='2'>Dominic Toretto</option>
                <option value='3'>James Bond</option>
              </select>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Aplicar Filtro
              </button>
            </div>
          </form>
        </div>
        <hr className='my-4' />
      </div>
      {showTable && <RideHistory rides={rides} />}
      {!showTable && (
        <div className='flex justify-center p-5'>
          <p>Nenhuma viagem foi encontrada para o filtro utilizado</p>
        </div>
      )}
    </div>
  );
};

export default RideHistoryPage;

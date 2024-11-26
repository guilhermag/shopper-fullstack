import React from 'react';

interface RideRequestFormProps {
  customerId: string;
  setCustomerId: (customerId: string) => void;
  origin: string;
  setOrigin: (origin: string) => void;
  destination: string;
  setDestination: (destination: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RideRequestForm = ({
  customerId,
  setCustomerId,
  origin,
  setOrigin,
  destination,
  setDestination,
  onSubmit,
}: RideRequestFormProps) => (
  <div className='w-full max-w-xs'>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='customerId' className='block text-gray-700 text-sm font-bold mb-2 my-5'>
          ID do Usuário:
        </label>
        <input
          type='text'
          id='customerId'
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div>
        <label htmlFor='origin' className='block text-gray-700 text-sm font-bold mb-2 my-5'>
          Origem:
        </label>
        <input
          type='text'
          id='origin'
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div>
        <label htmlFor='destination' className='block text-gray-700 text-sm font-bold mb-2 my-5'>
          Destino:
        </label>
        <input
          type='text'
          id='destination'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5'
      >
        Estimar Valor
      </button>
    </form>
  </div>
);

export default RideRequestForm;

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
  <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="customerId">ID do Usuário:</label>
      <input
        type="text"
        id="customerId"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="origin">Origem:</label>
      <input
        type="text"
        id="origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="destination">Destino:</label>
      <input
        type="text"
        id="destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
    </div>
    <button type="submit">Estimar Valor</button>
  </form>
);

export default RideRequestForm;
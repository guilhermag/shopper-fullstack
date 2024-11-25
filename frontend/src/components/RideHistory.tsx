import { Ride } from '../shared/types';

interface RideHistoryProps {
  rides: Ride[];
}

const RideHistory = ({ rides }: RideHistoryProps) => (
  <ul>
    {rides.map((ride) => (
      <li key={ride.id}>
        <p>Data e Hora: {new Date(ride.date).toLocaleString()}</p>
        <p>Motorista: {ride.driver.name}</p>
        <p>Origem: {ride.origin}</p>
        <p>Destino: {ride.destination}</p>
        <p>Distância: {ride.distance} km</p>
        <p>Tempo: {ride.duration}</p>
        <p>Valor: R$ {ride.value.toFixed(2)}</p>
      </li>
    ))}
  </ul>
);

export default RideHistory;
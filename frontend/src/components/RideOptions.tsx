import Map from './Map';
import { RideEstimate } from '../shared/types';

interface RideOptionsProps {
  estimates: RideEstimate[];
  onConfirm: (driverId: number) => void;
}

const RideOptions = ({ estimates, onConfirm }: RideOptionsProps) => (
  <div>
    {estimates.length > 0 && (
      <Map origin={estimates[0].origin} destination={estimates[0].destination} />
    )}

    <h2>Opções de Motoristas:</h2>
    <ul>
      {estimates.map((estimate) => (
        <li key={estimate.driver.id}>
          <h3>{estimate.driver.name}</h3>
          <p>{estimate.driver.description}</p>
          <p>Veículo: {estimate.driver.car}</p>
          <p>Avaliação: {estimate.driver.rating}</p>
          <p>Valor da Viagem: R$ {estimate.value.toFixed(2)}</p>
          <button onClick={() => onConfirm(estimate.driver.id)}>Escolher</button>
        </li>
      ))}
    </ul>
  </div>
);

export default RideOptions;
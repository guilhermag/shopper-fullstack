import Map from './Map';
import { EstimateResponse } from '../shared/responseTypes';

interface RideOptionsProps {
  estimate: EstimateResponse;
  directions: { origin: string; destination: string };
  onConfirm: (driver: { id: number; name: string; value: number }) => void;
}

const RideOptions = ({ estimate, directions, onConfirm }: RideOptionsProps) => (
  <div className='flex flex-col md:flex-row items-center justify-center'>
    {estimate && <Map origin={directions.origin} destination={directions.destination} />}

    {estimate.options.length > 0 ? (
      <ul className='flex flex-wrap m-4'>
        {estimate.options.map((driver) => (
          <li key={driver.id} className='p-1 md:w-1/3 '>
            <div className='bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
              <div className='p-6'>
                <h1 className='title-font text-lg font-medium text-gray-900 mb-3'>{driver.name}</h1>
                <p className='leading-relaxed mb-1 text-sm'>{driver.description}</p>
                <p className='leading-relaxed mb-1 text-sm'>
                  <span className='font-bold border-b'>Veículo:</span> {driver.vehicle}
                </p>
                <p className='leading-relaxed mb-1 text-sm'>
                  <span className='font-bold border-b'>Avaliação:</span>{' '}
                  {`${driver.review.rating}/5`}
                </p>
                <p className='leading-relaxed mb-1 text-sm'>
                  <span className='font-bold border-b'>Comentário:</span> {driver.review.comment}
                </p>
                <p className='leading-relaxed mb-1 text-sm'>
                  <span className='font-bold border-b'>Valor da Viagem:</span> R${' '}
                  {driver.value.toFixed(2)}
                </p>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5'
                  onClick={() =>
                    onConfirm({ id: driver.id, name: driver.name, value: driver.value })
                  }
                >
                  Escolher
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div>
        <p>
          Infelizmente nenhum motorista foi encontrado para a rota desejada, por favor escolha outro
          destino ou origem
        </p>
      </div>
    )}
  </div>
);

export default RideOptions;

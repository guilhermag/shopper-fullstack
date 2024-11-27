import { Ride } from '../shared/types';

interface RideHistoryProps {
  rides: Ride[];
}

const RideHistory = ({ rides }: RideHistoryProps) => (
  <ul>
    <div className='relative overflow-x-auto p-5'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50  '>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Data e Hora
            </th>
            <th scope='col' className='px-6 py-3'>
              Motorista
            </th>
            <th scope='col' className='px-6 py-3'>
              Origem
            </th>
            <th scope='col' className='px-6 py-3'>
              Destino
            </th>
            <th scope='col' className='px-6 py-3'>
              Distância
            </th>
            <th scope='col' className='px-6 py-3'>
              Tempo
            </th>
            <th scope='col' className='px-6 py-3'>
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {rides.length > 0 &&
            rides.map((ride) => (
              <tr className='bg-white border-b ' key={ride.id}>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
                  {ride.date}
                </th>
                <td className='px-6 py-4'>{ride.driver.name}</td>
                <td className='px-6 py-4'>{ride.origin}</td>
                <td className='px-6 py-4'>{ride.destination}</td>
                <td className='px-6 py-4'>{ride.distance}</td>
                <td className='px-6 py-4'>{ride.duration}</td>
                <td className='px-6 py-4'>R$ {ride.value.toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </ul>
);

export default RideHistory;

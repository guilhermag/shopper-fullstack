import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='container mx-auto flex flex-col items-center justify-center h-screen'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Nenhuma rota estimada</h2>
        <p className='text-center mb-6'>Por favor, estime uma rota antes de acessar esta página.</p>
        <button
          onClick={() => navigate('/')}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default NotFound;

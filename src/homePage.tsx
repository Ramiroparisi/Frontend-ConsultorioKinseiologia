import { useNavigate } from 'react-router-dom';

const HomePages = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-md text-center">
        
        {/* Logo / Ícono */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 text-blue-600 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Consultorio Kinesiológico
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Seleccioná tu rol para iniciar sesión
        </p>

        {/* Botones */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/loginKinesiologo')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition duration-200"
          >
            Kinesiólogo
          </button>
          <button
            onClick={() => navigate('/loginPaciente')}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl border border-gray-200 transition duration-200"
          >
            Paciente
          </button>
          <button
            onClick={() => navigate('/loginSecretaria')}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl border border-gray-200 transition duration-200"
          >
            Secretaria
          </button>
        </div>

      </div>
    </main>
  );
};

export default HomePages;

import { useNavigate } from 'react-router-dom';
import './estilos/homePage.css';

const HomePages = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 className="display-4">Bienvenido</h1>
        <p>Seleccione el tipo de usuario con el que desea iniciar sesión</p>

        <div
          className="button-group"
          role="group"
          aria-label="User type selection"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleNavigation('/loginKinesiologo')}
          >
            Kinesiologo
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleNavigation('/loginPaciente')}
          >
            Paciente
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleNavigation('/loginSecretaria')}
          >
            Secretaria
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePages;

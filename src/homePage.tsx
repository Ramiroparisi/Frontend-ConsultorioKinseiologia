import { useNavigate } from 'react-router-dom';
import './estilos/homePage.css'; // Importa los estilos personalizados
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegura que Bootstrap esté disponible

const HomePages = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <section className="homepage-section">
      <div className="container p-4 rounded shadow-sm bg-white text-center">
        <h1>Bienvenido</h1>
        <p>Seleccione el tipo de usuario con el que desea iniciar sesión</p>
        
        <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
          <button type="button" className="btn btn-primary" onClick={() => handleNavigation('/loginKinesiologo')}>Kinesiólogo</button>
          <button type="button" className="btn btn-primary" onClick={() => handleNavigation('/loginPaciente')}>Paciente</button>
          <button type="button" className="btn btn-primary" onClick={() => handleNavigation('/loginSecretaria')}>Secretaria</button>
        </div>
      </div>
    </section>
  );
};

export default HomePages;

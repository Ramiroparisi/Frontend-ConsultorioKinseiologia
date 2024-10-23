import { useNavigate } from 'react-router-dom';
import './estilos/homePage.css' // Importa los estilos personalizados

const HomePages = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <section>

      <div className="container">
        <h1>Bienvenido</h1>
        <p>Seleccione el tipo de usuario con el que desea iniciar sesión</p>
        
        <div>
          <button className="button" onClick={() => handleNavigation('/loginKinesiologo')}>Kinesiologo</button>
          <button className="button" onClick={() => handleNavigation('/loginPaciente')}>Paciente</button>
          <button className="button" onClick={() => handleNavigation('/loginSecretaria')}>Secretaria</button>
        </div>

      </div>
    </section>
  );
};

export default HomePages;
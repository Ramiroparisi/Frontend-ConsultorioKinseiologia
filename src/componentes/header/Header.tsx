import { useNavigate } from 'react-router-dom';
import '../../estilos/header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Mi Sitio
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {' '}
          {/* Agregar ms-auto aquí para alinear a la derecha */}
          <li className="nav-item">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => handleNavigation('/')}
            >
              Inicio
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => handleNavigation('/sobreNosotros')}
            >
              Sobre Nosotros
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleNavigation('/contacto')}
            >
              Contacto
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
import '../estilos/header.css'; // Importa el archivo CSS para los estilos del header


const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Mi consultorio autogestion</h1>
        <nav>
          <ul className="navbar-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/about">Sobre Nosotros</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'C:/Users/Usuario/Frontend-ConsultorioKinseiologia/src/estilos/homePage.css' // Importa los estilos personalizados

const HomePages = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <section>
      <div className="container">
        <h1>Bienvenido/a</h1>
        <p>Seleccione el tipo de usuario con el que desea iniciar sesión</p>
        <div className="button-group">
          <button onClick={() => handleNavigation('/loginKinesiologo')}>Kinesiologo</button>
          <button onClick={() => handleNavigation('/loginPaciente')}>Paciente</button>
          <button onClick={() => handleNavigation('/loginSecretaria')}>Secretaria</button>
        </div>
      </div>
    </section>
  );
};

export default HomePages;
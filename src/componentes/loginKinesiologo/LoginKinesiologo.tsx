// importante que la función Formulario empiece con mayúscula,
// para que react la reconozca como un componente

import React, { useState } from 'react';
import './LoginKinesiologo.css'; // Importa los estilos personalizados

// Formulario antes de bootstrap
const LoginKinesiolgo = () => {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // Validación de los inputs
    if (!matricula && !password) {
      setError('Todos los campos son obligatorios');
      return;
    }    
    if (!matricula) {
      setError('Debe ingresar su matricula');
      return;
    }
    if (!/^\d+$/.test(matricula)) {
      setError('La matrícula solo debe contener valores numéricos');
      return;
    }
    else if (!password){
      setError('La contraseña es obligatoria');
      return;
    }

    // La lógica de la autenticación se puede hacer acá, pero nosotros la hacemos en el backend
    console.log('Matricula:', matricula);
    console.log('Password:', password);

    // Limpiar el error si la validación pasa
    setError('');
  };
  return (
    <section>
      <div className='DivGeneral'>
        <h1> Iniciar sesión </h1>
        <form onSubmit={handleLogin}>
           {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='DivMatricula'>
            <label htmlFor="matricula">Ingrese su matricula:</label>
            <input
              type="text"
              id="matricula"
              value={matricula}
// El evento onChange ayuda a almacenar el valor del input en el estado
              onChange={(e) => setMatricula(e.target.value)}
            />
          </div>
          <div className='DivPassword'>
            <label htmlFor="password">Ingrese su contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </section>
  );
};

export default LoginKinesiolgo;


// importante que la función Formulario empiece con mayúscula,
// para que react la reconozca como un componente

import React, { useState } from 'react';
import './loginPaciente.css'; // Importa los estilos personalizados

// Formulario antes de bootstrap
const LoginPaciente = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // Validación de los inputs
    if (!mail || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }    
    if (!mail) {
      setError('Debe ingresar su email');
      return;
    }
    else if (!password) {
      setError('Debe ingresar su contraseña');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(mail)) {
      setError('El correo electrónico no es válido');
      return;
    }

    // La lógica de la autenticación se puede hacer acá, pero nosotros la hacemos en el backend
    console.log('Mail:', mail);
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
          <div className='DivMail'>
            <label htmlFor="mail">Ingrese su Email:</label>
            <input
              type="email"
              id="mail"
              value={mail}
// El evento onChange ayuda a almacenar el valor del input en el estado
              onChange={(e) => setMail(e.target.value)}
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

export default LoginPaciente;
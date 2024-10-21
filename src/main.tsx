/*import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import LoginKinesiolgo from './componentes/loginKinesiologo/LoginKinesiologo.tsx'
import LoginPaciente from './componentes/loginPaciente/loginPaciente.tsx'
import LoginSecretaria from './componentes/loginSecretaria/loginSecretaria.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginKinesiolgo />
    <LoginPaciente />
    <LoginSecretaria />
  </React.StrictMode>,
)*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './componentes/Inicio.tsx';
import LoginKinesiolgo from './componentes/loginKinesiologo/LoginKinesiologo.tsx';
import LoginPaciente from './componentes/loginPaciente/loginPaciente';
import LoginSecretaria from './componentes/loginSecretaria/loginSecretaria';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/loginKinesiologo" element={<LoginKinesiolgo />} />
        <Route path="/loginPaciente" element={<LoginPaciente />} />
        <Route path="/loginSecretaria" element={<LoginSecretaria />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
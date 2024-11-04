import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/header/Header.tsx';
import HomePages from './homePage.tsx';
import LoginKinesiolgo from './componentes/login/loginKinesiologo.tsx';
import LoginPaciente from './componentes/login/loginPaciente.tsx';
import LoginSecretaria from './componentes/login/loginSecretaria.tsx';
import PacienteDashboard from './dashboards/pacienteDashboard.tsx';
import KinesiologoDashboard from './dashboards/kinesiologoDashboard.tsx';
import SignUpPaciente from './componentes/login/signupPaciente.tsx';
import SobreNosotros from './componentes/header/sobreNosotros.tsx';
import Contacto from './componentes/header/contacto.tsx';
import CrearTurnoPaciente from './componentes/crearTurnos/turnoNuevoPaciente.tsx';


const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/loginKinesiologo" element={<LoginKinesiolgo />} />
        <Route path="/loginPaciente" element={<LoginPaciente />} />
        <Route path="/loginSecretaria" element={<LoginSecretaria />} />
        <Route path="/signupPaciente" element={<SignUpPaciente />} />

         {/* Rutas para los dashboards */}
    
        <Route path="/pacienteDashboard" element={<PacienteDashboard />} />
        <Route path="/kinesiologoDashboard" element={<KinesiologoDashboard />} />
        
        {/* Rutas para el header*/}
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/contacto" element={<Contacto />} /> 

        {/* Rutas para los turnos nuevos */}
        <Route path="/turnoNuevoPaciente" element={<CrearTurnoPaciente />} />    
        
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

export default App;
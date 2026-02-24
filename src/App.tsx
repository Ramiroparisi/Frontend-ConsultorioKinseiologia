import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas principales
import HomePages from './homePage.tsx';

// Login
// import LoginKinesiolgo from './componentes/login/loginKinesiologo.tsx';
// import LoginPaciente from './componentes/login/loginPaciente.tsx';
// import LoginSecretaria from './componentes/login/loginSecretaria.tsx';

// Signup
// import SignUpPaciente from './componentes/login/signupPaciente.tsx';

// Dashboards
// import PacienteDashboard from './dashboards/pacienteDashboard.tsx';
// import KinesiologoDashboard from './dashboards/kinesiologoDashboard.tsx';
// import SecretariaDashboard from './dashboards/secretariaDashboard.tsx';

// Registro
// import RegistroKinesiologo from './componentes/register/registrarKinesiologo.tsx';
// import RegistroDisponibilidad from './componentes/register/registrarDispo.tsx';
// import RegistroEspecialidad from './componentes/register/registrarEspecialidad.tsx';

// Turnos
// import CrearTurnoPaciente from './componentes/crearTurnos/turnoNuevoPaciente.tsx';

// Perfiles
// import DatosKine from './componentes/perfiles/perfilKine.tsx';
// import DatosPaciente from './componentes/perfiles/perfilPaciente.tsx';
// import DatosSecretaria from './componentes/perfiles/perfilSecretaria.tsx';

// Headers
// import Header from './componentes/header/Header.tsx';
// import DashboardHeader from './componentes/header/dashboardHeader.tsx';
// import DashboardHeaderKine from './componentes/header/dashboardHeaderKine.tsx';
// import DashboardHeaderSecretaria from './componentes/header/dashboardHeaderSecretaria.tsx';
// import SobreNosotros from './componentes/header/sobreNosotros.tsx';
// import Contacto from './componentes/header/contacto.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages />} />

        {/* Se irán descomentando a medida que se migren los componentes */}
        {/* <Route path="/loginKinesiologo" element={<LoginKinesiolgo />} /> */}
        {/* <Route path="/loginPaciente" element={<LoginPaciente />} /> */}
        {/* <Route path="/loginSecretaria" element={<LoginSecretaria />} /> */}
        {/* <Route path="/signupPaciente" element={<SignUpPaciente />} /> */}
        {/* <Route path="/registroKinesiologo" element={<RegistroKinesiologo />} /> */}
        {/* <Route path="/registroDisponibilidad" element={<RegistroDisponibilidad />} /> */}
        {/* <Route path="/registroEspecialidad" element={<RegistroEspecialidad />} /> */}
        {/* <Route path="/pacienteDashboard" element={<PacienteDashboard />} /> */}
        {/* <Route path="/kinesiologoDashboard" element={<KinesiologoDashboard />} /> */}
        {/* <Route path="/secretariaDashboard" element={<SecretariaDashboard />} /> */}
        {/* <Route path="/turnoNuevoPaciente" element={<CrearTurnoPaciente />} /> */}
        {/* <Route path="/datosKine" element={<DatosKine />} /> */}
        {/* <Route path="/datosPaciente" element={<DatosPaciente />} /> */}
        {/* <Route path="/datosSecretaria" element={<DatosSecretaria />} /> */}
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Componentes comunes
import Header from './componentes/header/Header.tsx';
import DashboardHeader from './componentes/header/dashboardHeader.tsx';
import DashboardHeaderKine from './componentes/header/dashboardHeaderKine.tsx';

// Páginas principales
import HomePages from './homePage.tsx';
import SobreNosotros from './componentes/header/sobreNosotros.tsx';
import Contacto from './componentes/header/contacto.tsx';

// Login
import LoginKinesiolgo from './componentes/login/loginKinesiologo.tsx';
import LoginPaciente from './componentes/login/loginPaciente.tsx';
import LoginSecretaria from './componentes/login/loginSecretaria.tsx';

// Signup
import SignUpPaciente from './componentes/login/signupPaciente.tsx';

// Dashboards
import PacienteDashboard from './dashboards/pacienteDashboard.tsx';
import KinesiologoDashboard from './dashboards/kinesiologoDashboard.tsx';
import SecretariaDashboard from './dashboards/secretariaDashboard.tsx';

// Registro
import RegistroKinesiologo from './componentes/register/registrarKinesiologo.tsx';
import RegistroDisponibilidad from './componentes/register/registrarDispo.tsx';

// Turnos
import CrearTurnoPaciente from './componentes/crearTurnos/turnoNuevoPaciente.tsx';
import DatosKine from '../src/componentes/datos/datosKine.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas para la página principal y header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePages />
            </>
          }
        />

        {/* Rutas de login */}
        <Route
          path="/loginKinesiologo"
          element={
            <>
              <Header />
              <LoginKinesiolgo />
            </>
          }
        />
        <Route
          path="/loginPaciente"
          element={
            <>
              <Header />
              <LoginPaciente />
            </>
          }
        />
        <Route
          path="/loginSecretaria"
          element={
            <>
              <Header />
              <LoginSecretaria />
            </>
          }
        />

        {/* Rutas de signup */}
        <Route
          path="/signupPaciente"
          element={
            <>
              <Header />
              <SignUpPaciente />
            </>
          }
        />

        {/* Rutas de registro */}
        <Route path="/registroKinesiologo" element={<RegistroKinesiologo />} />
        <Route
          path="/registroDisponibilidad"
          element={<RegistroDisponibilidad />}
        />

        {/* Rutas para los dashboards */}
        <Route
          path="/pacienteDashboard"
          element={
            <>
              <DashboardHeader />
              <PacienteDashboard />
            </>
          }
        />
        <Route
          path="/kinesiologoDashboard"
          element={
            <>
              <DashboardHeaderKine />
              <KinesiologoDashboard />
            </>
          }
        />
        <Route
          path="/secretariaDashboard"
          element={
            <>
              <DashboardHeader />
              <SecretariaDashboard />
            </>
          }
        />

        {/* Rutas de información general */}
        <Route
          path="/sobreNosotros"
          element={
            <>
              <Header />
              <SobreNosotros />
            </>
          }
        />
        <Route
          path="/contacto"
          element={
            <>
              <Header />
              <Contacto />
            </>
          }
        />

        {/* Rutas para los turnos */}
        <Route
          path="/turnoNuevoPaciente"
          element={
            <>
              <DashboardHeader />
              <CrearTurnoPaciente />
            </>
          }
        />
        {/* Rutas para los datos de kinesiologo */}
        <Route
          path="/datosKine"
          element={
            <>
              <DashboardHeaderKine />
              <DatosKine />
            </>
          }
        />
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

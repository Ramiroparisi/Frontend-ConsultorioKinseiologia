import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './componentes/header/Header.tsx';
import HomePages from './homePage.tsx';
import LoginKinesiolgo from './componentes/login/loginKinesiologo.tsx';
import LoginPaciente from './componentes/login/loginPaciente.tsx';
import LoginSecretaria from './componentes/login/loginSecretaria.tsx';
import PacienteDashboard from './dashboards/pacienteDashboard.tsx';
import KinesiologoDashboard from './dashboards/kinesiologoDashboard.tsx';
import SecretariaDashboard from './dashboards/secretariaDashboard.tsx';
import SignUpPaciente from './componentes/login/signupPaciente.tsx';
import SobreNosotros from './componentes/header/sobreNosotros.tsx';
import Contacto from './componentes/header/contacto.tsx';
import CrearTurnoPaciente from './componentes/crearTurnos/turnoNuevoPaciente.tsx';
import DashboardHeader from './componentes/header/dashboardHeader.tsx';
import DashboardHeaderKine from './componentes/header/dashboardHeaderKine.tsx';
import DatosKine from '../src/componentes/datos/datosKine.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePages />
            </>
          }
        />
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
        <Route
          path="/signupPaciente"
          element={
            <>
              <Header />
              <SignUpPaciente />
            </>
          }
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

        {/* Rutas para el header*/}
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

        {/* Rutas para los turnos nuevos */}
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/heder/Header.tsx';
import HomePages from './homePage.tsx';
import LoginKinesiolgo from './componentes/login/loginKinesiologo.tsx';
import LoginPaciente from './componentes/login/loginPaciente.tsx';
import LoginSecretaria from './componentes/login/loginSecretaria.tsx';
import DashboardPaciente from './dashboards/pacienteDashboard.tsx';
import SignUpPaciente from './componentes/login/signupPaciente.tsx';


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
    
        <Route path="/pacienteDashboard" element={<DashboardPaciente />} />
        
        
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
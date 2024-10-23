import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/Header.tsx';
import HomePages from './homePage.tsx';
import LoginKinesiolgo from './componentes/login/loginKinesiologo.tsx';
import LoginPaciente from './componentes/login/loginPaciente.tsx';
import LoginSecretaria from './componentes/login/loginSecretaria.tsx';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePages />} />
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

export default App;
import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../../estilos/login.css';

const LoginPaciente = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Debe completar todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/pacientes/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      Cookies.set('token', data.token, { expires: 1 });
      navigate('/pacienteDashboard');
    } catch (err) {
      setError('Error en la conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="header-spacer"></div>

      <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="col-sm-8 col-md-6 col-lg-4 p-4 shadow rounded bg-white">
          <h1 className="text-center mb-4">Iniciar sesión</h1>
          <Form onSubmit={handleLogin}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su email"
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form>
          <div className="text-center mt-4">
            <p>¿No estás registrado?</p>
            <Button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => navigate('/signupPaciente')}
            >
              Registrarse
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginPaciente;

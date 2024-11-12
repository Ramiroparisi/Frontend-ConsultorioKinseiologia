import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../../estilos/login.css';

const LoginKinesiologo = () => {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!matricula || !password) {
      setError('Debe completar todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/kinesiologos/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ matricula, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      Cookies.set('token', data.token, { expires: 1 });
      navigate('/kinesiologoDashboard');
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
            <Form.Group controlId="matricula" className="mb-3">
              <Form.Label>Matrícula</Form.Label>
              <Form.Control
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Ingrese su matrícula"
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
        </div>
      </Container>
    </>
  );
};

export default LoginKinesiologo;

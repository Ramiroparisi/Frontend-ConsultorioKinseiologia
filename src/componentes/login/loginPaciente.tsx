import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir

const LoginPaciente = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Hook para redirigir

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validación de los inputs
    if (!email && !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (!email) {
      setError('Debe ingresar su email');
      return;
    }
     else if (!password) {
      setError('Debe ingresar su contraseña');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('El correo electrónico no es válido');
      return;
    }
    setError(''); // Limpiar errores previos
    setLoading(true);

    try {
      // Llamada al backend para autenticar (con el puerto 3000)
      const response = await fetch('/api/pacientes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Incluir cookies en la solicitud
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error en la autenticación');
        setLoading(false);
        return;
      }

      // Guardar el token JWT en cookies
      Cookies.set('token', data.token, { expires: 1 }); // Guardar el token por 1 día

      // Redirigir al dashboard del paciente
      navigate('/pacienteDashboard');
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Error en la conexión. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
      
      <div className="col-md-2">
        <h1 className="text-center mb-4">Iniciar sesión</h1>
        <Form onSubmit={handleLogin}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="email">
            <Form.Label>Ingrese su email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Ingrese su contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </Form.Group>

          <Button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Ingresando...
              </>
            ) : ('Ingresar')}
          </Button>
          
        </Form>
        <div className="text-center mt-4 ">
            <p>¿No estás registrado?</p>
            <Button type="button" className="btn btn-custom2" onClick={() => handleNavigation('/signupPaciente')}>
              Sign Up
            </Button>
          </div>
      </div>
    </section>
  );
};

export default LoginPaciente;
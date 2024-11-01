import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import '../../estilos/login.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir

const LoginKinesiologo = () => {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validación de los inputs
    if (!matricula || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (!/^\d+$/.test(matricula)) {
      setError('La matrícula solo debe contener valores numéricos');
      return;
    }

    setError(''); // Limpiar errores previos
    setLoading(true);

    try {
      // Llamada al backend para autenticar (con el puerto 3000)
      const response = await fetch('/api/kinesiologos/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Incluir cookies en la solicitud
        body: JSON.stringify({ matricula, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error en la autenticación');
        setLoading(false);
        return;
      }

      // Guardar el token JWT en cookies
      Cookies.set('token', data.token, { expires: 1 }); // Guardar el token por 1 día

      // Redirigir al dashboard del kinesiologo
      navigate('/kinesiologoDashboard');
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Error en la conexión. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section>
      
      <div className="mb-3">
        <h1>Iniciar sesión</h1>
        
        <Form onSubmit={handleLogin}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="matricula">
            <Form.Label>Ingrese su matrícula</Form.Label>
            <Form.Control
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              placeholder="Matrícula"
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
      </div>
    </section>
  );
};

export default LoginKinesiologo;
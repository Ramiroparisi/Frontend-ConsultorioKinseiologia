import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir

const SignUpPaciente = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const [obraSocial, setObraSocial] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Hook para redirigir

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validación de los inputs completados
    if (!email && !password || !nombre || !apellido /*!dni || !fechaNacimiento || !telefono || !obraSocial*/ ) {
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
    else if (!nombre) {
        setError('Debe ingresar su nombre');
        return;
    }
    else if (!apellido) {
        setError('Debe ingresar su appellido');
        return;
    }
   else if (!dni) {
        setError('Debe ingresar su dni');
        return;
    }
    else if (!fechaNacimiento) {
        setError('Debe ingresar su fecha de nacimiento');
        return;
    }
    else if (!telefono) {
        setError('Debe ingresar su telefono');
        return;
    }
    else if (!obraSocial) {
        setError('Debe ingresar su obra social');
        return;
    }
    // Validación de los inputs tipos de datos
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('El correo electrónico no es válido');
        return;
    }
    if (!/^\d+$/.test(dni)) {
        setError('el dni solo debe contener valores numéricos');
        return;
    }
    if (!/^\d+$/.test(telefono)) {
        setError('la obrasocial solo debe contener valores numéricos');
        return;
    }
    setError(''); // Limpiar errores previos
    setLoading(true);

    try {
      const response = await fetch('/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  
        body: JSON.stringify({ nombre, apellido, dni, fechaNacimiento, email, telefono, password, obraSocial}),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error en la autenticación');
        setLoading(false);
        return;
      }

      
      Cookies.set('token', data.token, { expires: 1 }); // Guardar el token por 1 día

      
      handleNavigation('/pacienteDashboard');
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Error en la conexión. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <section className="d-flex justify-content-center align-items-center bg-ligt">
      
      <div className="md-2">
        <h1 className="text-center mb-4">Registro</h1>
        <Form onSubmit={handleSignUp}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="name" className="d-flex align-items-center">
            <div className="me-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
              />
            </div>
            <div>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido"
              />
            </div>
          </Form.Group>

          <Form.Group controlId="dni">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="DNI"
            />
          </Form.Group>

          <Form.Group controlId="fechadenacimiento">
            <Form.Label>Fecha de Nacimietno</Form.Label>
            <Form.Control
              type="text"
              value={fechaNacimiento}
              onChange={(e) => setFecha(e.target.value)}
              placeholder="YYYY-MM-DD"
            />
          </Form.Group>

          <Form.Group controlId="telefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="12345678"
            />
          </Form.Group>

          <Form.Group controlId="obrasocial">
            <Form.Label>Obra Social</Form.Label>
            <Form.Control
              type="text"
              value={obraSocial}
              onChange={(e) => setObraSocial(e.target.value)}
              
            />
          </Form.Group>
          
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
                Registrando...
              </>
            ) : ('Registrar')}
          </Button>
          
        </Form>
      </div>
    </section>
  );
};

export default SignUpPaciente;
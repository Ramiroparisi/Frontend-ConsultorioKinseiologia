import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../estilos/registros.css';

interface Especialidad {
  id: number;
  nombre: string;
  estado: boolean;
}

const RegistroKinesiologo: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');
  const [matricula, setMatricula] = useState('');
  const [especialidad, setEspecialidad] = useState<number | ''>('');
  const [consultorioId, setConsultorioId] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Obtener especialidades del backend
  const fetchEspecialidades = async () => {
    try {
      const response = await fetch('/api/especialidades', {
        method: 'GET',
        credentials: 'include', // Incluir cookies si son necesarias
      });
      if (!response.ok) {
        throw new Error('Error al obtener las especialidades');
      }
      const data = await response.json();
      // Filtrar solo las especialidades activas (estado: true)
      setEspecialidades(
        data.data.filter((especialidad: Especialidad) => especialidad.estado)
      );
    } catch (error) {
      console.error('Error al obtener las especialidades:', error);
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const handleRegistrarKinesiologo = async () => {
    // Validación de campos vacíos
    if (
      !nombre ||
      !apellido ||
      !email ||
      !telefono ||
      !dni ||
      !matricula ||
      especialidad === '' ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('/api/kinesiologos', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          telefono: Number(telefono),
          dni: Number(dni),
          matricula,
          especialidad,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el kinesiólogo');
      }

      navigate('/secretariaDashboard');
    } catch (error) {
      console.error('Error al registrar el kinesiólogo:', error);
    }
  };

  return (
    <body className='register'>
    <Container
      className="d-flex flex-column justify-content-center align-items-center pt-4"
      style={{ minHeight: '100vh' }}
    >
      {/* Título de la página */}
      <h1 className="text-center mb-4">Registro Kinesiologo</h1>

      <Form className="w-100">
        {/* Mostrar alerta de error si hay algún mensaje */}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        {/* Fila para los campos de nombre y apellido */}
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Fila para los campos de email y teléfono */}
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Fila para los campos de DNI y matrícula */}
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="dni">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="matricula">
              <Form.Label>Matricula</Form.Label>
              <Form.Control
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Campo de especialidad */}
        <Form.Group controlId="especialidad" className="mb-3">
          <Form.Label>Especialidad</Form.Label>
          <Form.Control
            as="select"
            value={especialidad}
            onChange={(e) => setEspecialidad(Number(e.target.value))}
            required
          >
            <option value="">Seleccione Especialidad...</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.id} value={especialidad.id}>
                {especialidad.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Campo de contraseña */}
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Campo de confirmación de contraseña */}
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Fila para los botones de "Registrar" y "Cancelar" */}
        <Row className="mb-3">
          <Col xs={6} className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="w-100"
              onClick={handleRegistrarKinesiologo}
            >
              Registrar
            </Button>
          </Col>
          <Col xs={6} className="d-flex justify-content-start">
            <Button
              variant="danger"
              className="w-100"
              onClick={() => navigate('/secretariaDashboard')}
            >
              Volver
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
    </body>
  );
};

export default RegistroKinesiologo;

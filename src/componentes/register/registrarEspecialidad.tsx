import React, { useState } from 'react';
import { Button, Form, Container, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../estilos/registros.css';

const RegistroEspecialidad: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito
  const navigate = useNavigate();

  const RegistrarEspecialidad = async () => {
    if (!nombre) {
      setErrorMessage('Por favor, ingrese el nombre de la especialidad.');
      return;
    }

    try {
      const response = await fetch('/api/especialidades', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la especialidad');
      }

      // Si el registro es exitoso, mostramos un mensaje de éxito
      setSuccessMessage('Especialidad registrada correctamente.');

      // Después de mostrar el mensaje, redirigimos al dashboard de secretaria
      setTimeout(() => {
        navigate('/secretariaDashboard');
      }, 2000); // Espera 2 segundos para que el usuario vea el mensaje de éxito
    } catch (error) {
      console.error('Error al registrar la especialidad:', error);
      setErrorMessage('Hubo un error al registrar la especialidad.');
    }
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center pt-4"
      style={{ minHeight: '100vh' }}
    >
      <h1 className="text-center mb-4">Registrar Especialidad</h1>

      <Form className="w-100">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && (
          <Alert variant="success">{successMessage}</Alert>
        )}{' '}
        {/* Mostrar mensaje de éxito */}
        {/* Campo de nombre de la especialidad */}
        <Form.Group controlId="nombre" className="mb-3">
          <Form.Label>Nombre de la Especialidad</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Row className="mb-3">
          <Col xs={6} className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="w-100"
              onClick={RegistrarEspecialidad}
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
  );
};

export default RegistroEspecialidad;
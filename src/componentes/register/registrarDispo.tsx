import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../estilos/registros.css';

const RegistroDisponibilidad: React.FC = () => {
  const [diaSemana, setDiaSemana] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [kinesiologoId, setKinesiologoId] = useState<number | null>(null);
  const [kinesiologos, setKinesiologos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKinesiologos = async () => {
      try {
        const response = await fetch('/api/kinesiologos/consul', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Error al obtener los kinesiólogos');
        const data = await response.json();
        setKinesiologos(data.data);
      } catch (error) {
        console.error('Error al obtener los kinesiólogos:', error);
        setErrorMessage('Hubo un problema al cargar los kinesiólogos.');
      }
    };

    fetchKinesiologos();
  }, []);

  const handleRegistrarDisponibilidad = async () => {
    if (!diaSemana || !horaInicio || !horaFin || !kinesiologoId) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    const [inicioHours, inicioMinutes] = horaInicio.split(':').map(Number);
    const [finHours, finMinutes] = horaFin.split(':').map(Number);
    if (
      inicioHours > finHours ||
      (inicioHours === finHours && inicioMinutes >= finMinutes)
    ) {
      setErrorMessage('La hora de fin debe ser posterior a la hora de inicio.');
      return;
    }

    try {
      const response = await fetch('/api/disponibilidad', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaSemana,
          horaInicio,
          horaFin,
          kinesiologo: kinesiologoId, // Enviar el ID del kinesiólogo
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la disponibilidad');
      }

      setSuccessMessage('Disponibilidad registrada con éxito.');

      setTimeout(() => {
        navigate('/registroDisponibilidad');
      }, 2000);
    } catch (error) {
      console.error('Error al registrar la disponibilidad:', error);
      setErrorMessage('Hubo un problema al registrar la disponibilidad.');
    }
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center pt-4"
      style={{ minHeight: '100vh' }}
    >
      <h1 className="text-center mb-4">Registrar Disponibilidad</h1>

      <Form className="w-100">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        {/* Selector de kinesiólogo */}
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="kinesiologo">
              <Form.Label>Kinesiólogo</Form.Label>
              <Form.Control
                as="select"
                value={kinesiologoId ?? ''}
                onChange={(e) => setKinesiologoId(Number(e.target.value))}
                required
              >
                <option value="">Seleccione un kinesiólogo...</option>
                {kinesiologos.map(
                  (kine: { id: number; nombre: string; apellido: string }) => (
                    <option key={kine.id} value={kine.id}>
                      {kine.nombre} {kine.apellido}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Selector de día */}
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="diaSemana">
              <Form.Label>Dia de la semana</Form.Label>
              <Form.Control
                as="select"
                value={diaSemana}
                onChange={(e) => setDiaSemana(e.target.value)}
                required
              >
                <option value="">Seleccione un día...</option>
                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miércoles">Miércoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
                <option value="sábado">Sábado</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Selector de horas */}
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="horaInicio">
              <Form.Label>Hora de Inicio</Form.Label>
              <Form.Control
                as="select"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                required
              >
                <option value="">Seleccione una hora...</option>
                <option value="08:00">08:00</option>
                <option value="12:00">12:00</option>
                <option value="16:00">16:00</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="horaFin">
              <Form.Label>Hora de Fin</Form.Label>
              <Form.Control
                as="select"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                required
              >
                <option value="">Seleccione una hora...</option>
                <option value="12:00">12:00</option>
                <option value="16:00">16:00</option>
                <option value="20:00">20:00</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Botones */}
        <Row className="mb-3">
          <Col xs={6} className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="w-100"
              onClick={handleRegistrarDisponibilidad}
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
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default RegistroDisponibilidad;
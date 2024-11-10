import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const RegistroDisponibilidad: React.FC = () => {
  const [dia, setDia] = useState('');
  const [horarios, setHorarios] = useState<string[]>([]);
  const [kinesiologoId, setKinesiologoId] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para acceder al estado pasado desde la navegación

  const opcionesHorarios = ['08:00-12:00', '13:00-17:00', '17:00-21:00'];

  // Recuperamos el kinesiologoId del estado pasado por la navegación
  useEffect(() => {
    if (location.state && location.state.kinesiologoId) {
      setKinesiologoId(location.state.kinesiologoId);
    }
  }, [location.state]);

  const handleHorarioChange = (horario: string) => {
    setHorarios((prev) =>
      prev.includes(horario)
        ? prev.filter((h) => h !== horario)
        : [...prev, horario]
    );
  };

  const handleRegistrarDisponibilidad = async () => {
    if (!kinesiologoId) {
      alert('Error: No se ha seleccionado un kinesiólogo.');
      return;
    }

    try {
      const response = await fetch('/api/disponibilidad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dia,
          horarios,
          kinesiologoId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la disponibilidad');
      }

      navigate('/secretariaDashboard'); // Volver al dashboard
    } catch (error) {
      console.error('Error al registrar la disponibilidad:', error);
    }
  };

  return (
    <Container className="pt-4">
      <h2>Registro de Disponibilidad</h2>
      <Form>
        <Form.Group controlId="dia">
          <Form.Label>Día de la Semana</Form.Label>
          <Form.Control
            as="select"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            required
          >
            <option value="">Selecciona un día</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="horarios" className="mt-3">
          <Form.Label>Horarios Disponibles</Form.Label>
          {opcionesHorarios.map((opcion) => (
            <Form.Check
              key={opcion}
              type="checkbox"
              label={opcion}
              checked={horarios.includes(opcion)}
              onChange={() => handleHorarioChange(opcion)}
            />
          ))}
        </Form.Group>
        <Button onClick={handleRegistrarDisponibilidad} className="mt-3">
          Registrar Disponibilidad
        </Button>
      </Form>
    </Container>
  );
};

export default RegistroDisponibilidad;

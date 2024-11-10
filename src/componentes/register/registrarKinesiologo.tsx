import '../../estilos/registrarKine.css';
import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
  const [especialidad, setEspecialidad] = useState<number | ''>(''); // Cambiado a número o cadena vacía
  const [consultorioId, setConsultorioId] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
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
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    if (especialidad === '') {
      alert('Por favor, selecciona una especialidad.');
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
    <Container
      className="d-flex flex-column justify-content-center align-items-center pt-4"
      style={{ minHeight: '100vh' }}
    >
      <h2>Registro de Kinesiologo</h2>
      <Form className="w-50 mx-auto">
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="apellido" className="mt-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="telefono" className="mt-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dni" className="mt-3">
          <Form.Label>DNI</Form.Label>
          <Form.Control
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="matricula" className="mt-3">
          <Form.Label>Matrícula</Form.Label>
          <Form.Control
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="especialidad" className="mt-3">
          <Form.Label>Especialidad</Form.Label>
          <Form.Control
            as="select"
            value={especialidad}
            onChange={(e) => setEspecialidad(Number(e.target.value) || '')}
            required
          >
            <option value="">Selecciona una especialidad</option>
            {especialidades.map((opcion) => (
              <option key={opcion.id} value={opcion.id}>
                {opcion.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          className="mt-3"
          onClick={handleRegistrarKinesiologo}
        >
          Registrar Kinesiologo
        </Button>
      </Form>
    </Container>
  );
};
export default RegistroKinesiologo;

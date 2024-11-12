import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../estilos/perfiles.css';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono: number;
  obraSocial: string;
}

const DatosPaciente: React.FC = () => {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [editedData, setEditedData] = useState<Paciente | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatosPaciente = async () => {
      try {
        const response = await fetch(`/api/pacientes/k/${paciente?.id}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        setPaciente(data.data);
        setEditedData(data.data);
      } catch (error) {
        console.error('Error al obtener los datos del paciente:', error);
        navigate('/');
      }
    };

    obtenerDatosPaciente();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedData) {
      setEditedData({
        ...editedData,
        [name]: value,
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedData(paciente);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!paciente) return;

    const dataToUpdate = {
      nombre: editedData?.nombre,
      apellido: editedData?.apellido,
      dni: editedData?.dni,
      email: editedData?.email,
      telefono: editedData?.telefono,
      direccion: editedData?.obraSocial,
    };

    try {
      const response = await fetch(`/api/pacientes/k/${paciente.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToUpdate),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar los datos del paciente');
      }

      const updatedData = await response.json();
      setPaciente(updatedData.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los datos del paciente:', error);
    }
  };

  return (
    <body className='perfil-paciente'>
    <Container className="datos-paciente-container">
      <h2>Mis datos</h2>
      {paciente && (
        <Form className="formulario">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Nombre:</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="nombre"
                className="formularioC"
                value={editedData?.nombre || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Apellido:</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="apellido"
                className="formularioC"
                value={editedData?.apellido || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">DNI:</Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                name="dni"
                className="formularioN"
                value={editedData?.dni || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Email:</Form.Label>
            <Col sm="9">
              <Form.Control
                type="email"
                name="email"
                className="formularioC"
                value={editedData?.email || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Teléfono:</Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                name="telefono"
                className="formularioN"
                value={editedData?.telefono || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Obra Social:</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="direccion"
                className="formularioC"
                value={editedData?.obraSocial || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
          </Form.Group>
          <div className="text-right">
            {isEditing ? (
              <>
                <Button type="button" className="guardar me-2" onClick={handleSave}>
                  Guardar
                </Button>
                <Button type="button" className="cancelar" onClick={handleCancel}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button type="button" className="editar" onClick={handleEdit}>
                Editar
              </Button>
            )}
          </div>
        </Form>
      )}
    </Container>
    </body>
  );
};

export default DatosPaciente;

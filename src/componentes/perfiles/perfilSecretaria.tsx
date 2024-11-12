import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../estilos/perfiles.css';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Secretaria {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono: number;
  consultorio: Consultorio;
}

interface Consultorio{  
  id: number;
  nombre: string;
}

const DatosSecretaria: React.FC = () => {
  const [secretaria, setSecretaria] = useState<Secretaria | null>(null);
  const [editedData, setEditedData] = useState<Secretaria | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatosSecretaria = async () => {
      try {
        const response = await fetch(`/api/secretarias/k/${secretaria?.id}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setSecretaria(data.data);
        setEditedData(data.data);
      } catch (error) {
        console.error('Error al obtener los datos de la secretaria:', error);
        navigate('/');
      }
    };

    obtenerDatosSecretaria();
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
    setEditedData(secretaria); // Resetea a los datos originales
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!secretaria) return;

    const dataToUpdate = {
      nombre: editedData?.nombre,
      apellido: editedData?.apellido,
      dni: editedData?.dni,
      email: editedData?.email,
      telefono: editedData?.telefono,
    };

    try {
      const response = await fetch(`/api/secretarias/k/${secretaria.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToUpdate),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar los datos de la secretaria');
      }

      const updatedData = await response.json();
      setSecretaria(updatedData.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los datos de la secretaria:', error);
      console.log('Datos a guardar:', dataToUpdate);
    }
  };

  return (
    <body className='perfil-secretaria'>
    <Container className="datos-secretaria-container">
      <h2>Mis datos</h2>
      {secretaria && (
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
            <Form.Label column sm="3">Consultorio:</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="especialidad"
                className="formularioC"
                value={editedData?.consultorio?.nombre || ''}
                disabled
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

export default DatosSecretaria;

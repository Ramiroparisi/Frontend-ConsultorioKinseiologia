import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../estilos/perfiles.css';
import { Button } from 'react-bootstrap';
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

interface Consultorio {
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
        throw new Error('Error al actualizar los datos del kinesiólogo');
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
    <div className="datos-kine-container">
      <h2>Mis datos</h2>
      {secretaria && (
        <form className="formulario">
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              className="formularioC"
              value={editedData?.nombre || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              className="formularioC"
              value={editedData?.apellido || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label>DNI:</label>
            <input
              type="number"
              name="dni"
              className="formularioN"
              value={editedData?.dni || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="formularioC"
              value={editedData?.email || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="number"
              name="telefono"
              className="formularioN"
              value={editedData?.telefono || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label>Consultorio:</label>
            <input
              type="text"
              name="especialidad"
              className="formularioC"
              value={editedData?.consultorio?.nombre || ''}
              disabled
            />
          </div>
          <div className="buttons">
            {isEditing ? (
              <>
                <Button type="button" className="guardar" onClick={handleSave}>
                  Guardar
                </Button>
                <Button
                  type="button"
                  className="cancelar"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <Button type="button" className="editar" onClick={handleEdit}>
                Editar
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default DatosSecretaria;

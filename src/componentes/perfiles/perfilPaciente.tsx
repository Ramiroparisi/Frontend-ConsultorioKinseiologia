import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../estilos/perfiles.css';
import { Button } from 'react-bootstrap';
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
        console.log('Datos recibidos:', data);
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
    setEditedData(paciente); // Resetea a los datos originales
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!paciente) return;

    const dataToUpdate = {
      nombre: editedData?.nombre,
      apellido: editedData?.apellido,
      dni: editedData?.dni,
      //      fechaNacimiento: editedData?.fechaNacimiento,
      email: editedData?.email,
      telefono: editedData?.telefono,
      obraSocial: editedData?.obraSocial,
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
      console.log('Datos a guardar:', dataToUpdate);
    }
  };

  return (
    <div className="datos-kine-container">
      <h2>Mis datos</h2>
      {paciente && (
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
          {/*       <div>
          <label>Fecha de nacimiento:</label>
            <input
              type="text"
              name="fechaNacimiento"
              className="formularioC"
              value={editedData?.fechaNacimiento instanceof Date ? editedData.fechaNacimiento.toISOString().split('T')[0] : editedData?.fechaNacimiento || ''}
              disabled
            />
          </div> */}
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
            <label>Obra social:</label>
            <input
              type="obraSocial"
              name="obraSocial"
              className="formularioC"
              value={editedData?.obraSocial || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
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

export default DatosPaciente;

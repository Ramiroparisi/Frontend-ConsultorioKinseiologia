import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../estilos/secretariaDash.css';

interface Kinesiologo {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: { id: number; nombre: string };
}

interface Especialidad {
  id: number;
  nombre: string;
  estado: boolean;
}

interface Disponibilidad {
  id: number;
  dia: string;
  horarioInicio: string;
  horarioFin: string;
}

function SecretariaDashboard() {
  const [especialidad, setEspecialidad] = useState<Especialidad | null>(null);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [kinesiologos, setKinesiologos] = useState<Kinesiologo[]>([]);
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>(
    []
  );
  const [kinesiologoSeleccionado, setKinesiologoSeleccionado] = useState<
    number | null
  >(null);

  const navigate = useNavigate();

  // Función para obtener las especialidades activas
  const fetchEspecialidades = async () => {
    try {
      const response = await fetch('/api/especialidades', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Error al obtener las especialidades');
      const data = await response.json();
      setEspecialidades(
        data.data.filter((especialidad: Especialidad) => especialidad.estado)
      );
    } catch (error) {
      console.error('Error al obtener las especialidades:', error);
    }
  };

  // Este lo hago para obtener los kinesiólogos según la especialidad seleccionada
  const fetchKinesiologos = async (especialidadId: number) => {
    try {
      const response = await fetch(`/api/kinesiologos/${especialidadId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Error al obtener los kinesiólogos');
      const data = await response.json();
      setKinesiologos(data.data);
    } catch (error) {
      console.error('Error al obtener los kinesiólogos:', error);
    }
  };

  // Este lo hago para obtener todos los kinesiólogos de este consultorio
  const fetchTodosLosKinesiologos = async () => {
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
    }
  };

  // Función para obtener las disponibilidades filtradas por kinesiólogo seleccionado
  const fetchDisponibilidades = async (kineId: number) => {
    try {
      const response = await fetch(`/api/disponibilidad/${kineId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok)
        throw new Error('Error al obtener las disponibilidades');
      const data = await response.json();
      setDisponibilidades(data.data);
    } catch (error) {
      console.error('Error al obtener las disponibilidades:', error);
    }
  };

  // Función para manejar el cambio de especialidad
  const handleEspecialidadChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedEspecialidadId = event.target.value
      ? parseInt(event.target.value)
      : null;
    const selectedEspecialidad = especialidades.find(
      (esp) => esp.id === selectedEspecialidadId
    );
    setEspecialidad(selectedEspecialidad || null);
  };

  // Función para manejar el cambio de kinesiólogo seleccionado y cargar disponibilidades
  const handleKinesiologoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedKineId = parseInt(event.target.value);
    setKinesiologoSeleccionado(selectedKineId);
    fetchDisponibilidades(selectedKineId);
  };

  // Función para eliminar una disponibilidad
  const handleRemoveDisponibilidad = async (id: number) => {
    try {
      const confirmar = window.confirm(
        '¿Está seguro de que desea eliminar esta disponibilidad?'
      );
      if (confirmar) {
        const response = await fetch(`/api/disponibilidad/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok)
          throw new Error('Error al eliminar la disponibilidad');
        alert('Disponibilidad eliminada con éxito.');
        if (kinesiologoSeleccionado)
          fetchDisponibilidades(kinesiologoSeleccionado); // Recargar disponibilidades
      }
    } catch (error) {
      console.error('Error al eliminar la disponibilidad:', error);
    }
  };

  // Función general para eliminar un Kinesiologo
  const handleRemoveItem = async (id: number) => {
    try {
      const confirmar = window.confirm(
        '¿Está seguro de que desea dar de baja al kinesiologo?'
      );
      if (confirmar) {
        const response = await fetch(`/api/kinesiologos/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message);
        } else {
          alert('Kinesiologo eliminado con éxito.');
        }
      }
    } catch (error) {
      console.error('Error al intentar eliminar el kinesiologo:', error);
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    if (especialidad) {
      fetchKinesiologos(especialidad.id);
    } else {
      fetchTodosLosKinesiologos();
    }
  }, [especialidad]);

  return (
    <div className="dashboard">
      <div className="container pt-4 pb-4">
        <h1 className="dashboard-title">Dashboard de Secretaria</h1>

        {/* Sección Kinesiologos */}
        <div className="dashboard-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-person-circle"></i>
            <h2 className="section-title">Kinesiologos</h2>
          </div>

          {/* Filtro por especialidad */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <select
              className="form-select w-50"
              value={especialidad?.id || ''}
              onChange={handleEspecialidadChange}
            >
              <option value="">Todas las Especialidades</option>
              {especialidades.map((esp) => (
                <option key={esp.id} value={esp.id}>
                  {esp.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Listado de Kinesiologos */}
          <ul className="list-group">
            {kinesiologos.map((kinesiologo) => (
              <li
                key={kinesiologo.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {kinesiologo.nombre} {kinesiologo.apellido} -{' '}
                {kinesiologo.especialidad.nombre}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveItem(kinesiologo.id)}
                >
                  Dar de Baja
                </button>
              </li>
            ))}
          </ul>
          {/* Botón Agregar Kinesiologo */}
          <div className="text-center mt-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/registroKinesiologo')}
            >
              Agregar Kinesiologo
            </button>
          </div>
        </div>

        {/* Sección Disponibilidades */}
        <div className="dashboard-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-calendar"></i>
            <h2 className="section-title">Disponibilidades</h2>
          </div>

          <select
            className="form-select mb-3"
            onChange={handleKinesiologoChange}
          >
            <option value="">Seleccionar Kinesiologo</option>
            {kinesiologos.map((kine) => (
              <option key={kine.id} value={kine.id}>
                {kine.nombre} {kine.apellido}
              </option>
            ))}
          </select>

          <ul className="list-group">
            {disponibilidades.map((dispo) => (
              <li
                key={dispo.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {dispo.dia} {dispo.horarioInicio} - {dispo.horarioFin}
                <div>
                  <button className="btn btn-outline-primary btn-sm me-2">
                    Modificar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemoveDisponibilidad(dispo.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center mt-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/registroDisponibilidad')}
            >
              Agregar Disponibilidad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecretariaDashboard;

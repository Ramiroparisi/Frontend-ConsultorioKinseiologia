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

function SecretariaDashboard() {
  const [especialidad, setEspecialidad] = useState<Especialidad | null>(null);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [kinesiologos, setKinesiologos] = useState<Kinesiologo[]>([]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [turnosPendientes, setTurnosPendientes] = useState<Turno[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [filtroEspecialidad, setFiltroEspecialidad] = useState<string>('');
  const [filtroKinesiologo, setFiltroKinesiologo] = useState<number | ''>('');
  const [consultorioId, setConsultorioId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Función para obtener las especialidades activas
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

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  // Efecto que se ejecuta cuando se selecciona una especialidad
  useEffect(() => {
    if (especialidad) {
      fetchKinesiologos(especialidad.id);
    } else {
      fetchTodosLosKinesiologos();
    }
  }, [especialidad]);

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

  // Función general para eliminar un ítem
  const handleRemoveItem = async (id: number) => {
    try {
      // Mostrar la ventana de confirmación
      const confirmar = window.confirm(
        '¿Está seguro de que desea dar de baja al kinesiologo?'
      );

      if (confirmar) {
        // Hacer una solicitud DELETE al backend
        const response = await fetch(`/api/kinesiologos/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          // Si tiene turnos activos, mostrar el mensaje de error
          alert(errorData.message); // Muestra el mensaje del backend al usuario
        } else {
          // Si se eliminó correctamente
          alert('Kinesiologo eliminado con éxito.');
          // Aquí puedes actualizar la lista de kinesiologos en el frontend
        }
      } else {
        console.log('El usuario canceló la eliminación del kinesiologo.');
      }
    } catch (error) {
      console.error('Error al intentar eliminar el kinesiologo:', error);
    }
  };

  // Función para manejar la navegación
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="dashboard">
      <div className="container pt-4 pb-4">
        <h1 className="dashboard-title">Dashboard de Secretaria</h1>

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
              {especialidades.length > 0 ? (
                especialidades.map((esp) => (
                  <option key={esp.id} value={esp.id}>
                    {esp.nombre}
                  </option>
                ))
              ) : (
                <option>No hay especialidades disponibles</option>
              )}
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
              onClick={() => handleNavigation('/registroKinesiologo')}
            >
              Agregar Kinesiologo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecretariaDashboard;

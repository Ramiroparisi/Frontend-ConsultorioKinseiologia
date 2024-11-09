import React, { useState, useEffect } from 'react';
import '../../estilos/turnoNuevo.css';

// Definir los tipos para los consultorios
interface Consultorio {
    id: number;
    nombre: string;
    domicilio: string;  // Agregamos el domicilio a los datos que se reciben
  }

interface Especialidad {
    id: number;
    nombre: string;
    estado: boolean; // Estado de la especialidad
  }

interface Kinesiologo {
    id: number;
    nombre: string;
    apellido: string
    especialidadId: number;
    consultorioId: number;
  }

// Interfaz para Disponibilidad
interface Disponibilidad {
    id: number;
    horariosDisponibles: string[];
  }
  

const TurnoForm: React.FC = () => {
  // Estados para los campos del formulario
  const [consultorio, setConsultorio] = useState<Consultorio | null>(null);
  const [consultorios, setConsultorios] = useState<Consultorio[]>([]);
  const [especialidad, setEspecialidad] = useState<Especialidad | null>(null);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [kinesiologo, setKinesiologo] = useState<string>('');
  const [kinesiologos, setKinesiologos] = useState<Kinesiologo[]>([]);
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('');
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad | null>(null);
  const [mensaje, setMensaje] = useState<string>('');


  // Función para obtener los consultorios 
  const fetchConsultorios = async () => {
    try {
      const response = await fetch('/api/consultorios',{
        method: 'GET',
        credentials: 'include', // Incluye cookies en la solicitud
      });
      if (!response.ok) {
        throw new Error('Error al obtener los consultorios');
      }
      const data = await response.json();
      setConsultorios(data.data); // Asignamos los consultorios a su estado
    } catch (error) {
      console.error('Error al obtener los consultorios:', error);
    }
  };

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
      setEspecialidades(data.data.filter((especialidad: Especialidad) => especialidad.estado));
    } catch (error) {
      console.error('Error al obtener las especialidades:', error);
    }
  };

  // Función para obtener los kinesiólogos asociados a una especialidad
  const fetchKinesiologos = async (especialidadId: number, consultorioId: number) => {
    try {
      const response = await fetch(`/api/especialidades/${especialidadId}/${consultorioId}/kinesiologos`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Error al obtener los kinesiólogos');
      }
      const data = await response.json();
      setKinesiologos(data.data);
    } catch (error) {
      console.error('Error al obtener los kinesiólogos:', error);
    }
  };

  const fetchDisponibilidades = async (fecha: string, kinesiologoId: number) => {
    try {
      const response = await fetch(`/api/disponibilidad/${fecha}/${kinesiologoId}/disponibilidad`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Error al obtener los horarios disponibles');
      }
      const data = await response.json();
      setDisponibilidades(data); // Actualiza las horas disponibles según la respuesta del backend
    } catch (error) {
      console.error('Error al obtener los horarios disponibles:', error);
    }
  };

  // Llamada a la API para obtener los consultorios y especialidades cuando el componente se monta
  useEffect(() => {
    fetchConsultorios();
    fetchEspecialidades();
  }, []);

  // Efecto que se ejecuta cuando se selecciona una especialidad
  useEffect(() => {
    if (especialidad && consultorio) {
      fetchKinesiologos(especialidad.id, consultorio.id);
    }
  }, [especialidad,consultorio]);

    // Efecto que se ejecuta cuando se selecciona un kinesiólogo
    useEffect(() => {
        if (kinesiologo && fecha) {
          fetchDisponibilidades(fecha, Number(kinesiologo));
        }
      }, [fecha, kinesiologo]);


// Función para manejar el cambio de consultorio
const handleConsultorioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedConsultorio = consultorios.find((c) => c.id === parseInt(event.target.value));
    setConsultorio(selectedConsultorio || null);

        // Reseteamos los campos dependientes
        setEspecialidad(null);
        setKinesiologo('');
        setKinesiologos([]);
        setFecha('');
        setHora('');
  };

// Función para manejar el cambio de especialidad
const handleEspecialidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEspecialidad = especialidades.find((esp) => esp.id === parseInt(event.target.value));
    setEspecialidad(selectedEspecialidad || null);

        // Reseteamos los campos dependientes
        setKinesiologo('');
        setKinesiologos([]);
        setFecha('');
        setHora('');
  };

  const handleKinesiologoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setKinesiologo(event.target.value); // Asegúrate de que el valor sea un número
  };

  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(event.target.value);
  };

  const handleHoraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHora(event.target.value);
  };

// Obtener la fecha de hoy en formato YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  if (!consultorio || !especialidad || !kinesiologo || !fecha || !hora) {
    setMensaje('Por favor, complete todos los campos.');
    return;
  }

  const turnoData = {
    especialidadId: especialidad.id,
    kinesiologoId: Number(kinesiologo),
    fecha,
    hora,
  };

  try {
    const response = await fetch('/api/turnos/turnoNuevo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(turnoData),
    });
    const data = await response.json();

    if (response.ok) {
      setMensaje('Turno registrado exitosamente');
    } else {
      setMensaje(data.message || 'Error al registrar el turno');
    }
  } catch (error) {
    console.error('Error al registrar el turno:', error);
    setMensaje('Error al registrar el turno');
  }
};

return (
  <div className="dashboard-nt">
    <div className="container-nt">
      <h2 className="dashboard-title-nt mb-3">Solicitar Turno</h2>
      <div onSubmit={handleSubmit} className="form-background" role="form">
        <div className="mb-3">
          <label htmlFor="consultorio" className="form-label section-title">Consultorio</label>
          <select
            id="consultorio"
            className="form-select"
            value={consultorio?.id || ''}
            onChange={handleConsultorioChange}
          >
            <option value="">Seleccione un consultorio</option>
            {consultorios.map((consultorio) => (
              <option key={consultorio.id} value={consultorio.id}>
                {consultorio.nombre} - {consultorio.domicilio}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="especialidad" className="form-label section-title">Especialidad</label>
          <select
            id="especialidad"
            className="form-select"
            value={especialidad?.id || ''}
            onChange={handleEspecialidadChange}
            disabled={!consultorio}
          >
            <option value="">Seleccione una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.id} value={especialidad.id}>
                {especialidad.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="kinesiologo" className="form-label section-title">Kinesiólogo</label>
          <select
            id="kinesiologo"
            className="form-select"
            value={kinesiologo}
            onChange={handleKinesiologoChange}
            disabled={!especialidad || !consultorio}
          >
            <option value="">Seleccione un kinesiólogo</option>
            {kinesiologos.map((kinesiologo) => (
              <option key={kinesiologo.id} value={kinesiologo.id}>
                Lic. {kinesiologo.nombre} {kinesiologo.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="fecha" className="form-label section-title">Fecha</label>
          <input
            type="date"
            id="fecha"
            className="form-control"
            value={fecha}
            onChange={handleFechaChange}
            disabled={!kinesiologo}
            min={today}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="hora" className="form-label section-title">Hora</label>
          <select
            id="hora"
            className="form-select"
            value={hora}
            onChange={handleHoraChange}
            disabled={!fecha}
          >
            <option value="">Seleccione una hora</option>
            {disponibilidades?.horariosDisponibles?.map((horario) => (
              <option key={horario} value={horario}>
                {horario}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button" 
          className="btn btn-dark mt-4"
          onClick={handleSubmit} // Enlazamos el evento "onClick"
          disabled={!consultorio || !especialidad || !kinesiologo || !fecha || !hora}
        >
          Enviar
        </button>

        {mensaje && (
          <div className={`mt-3 ${mensaje.includes('exitosamente') ? 'message-success' : 'message-error'}`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default TurnoForm;

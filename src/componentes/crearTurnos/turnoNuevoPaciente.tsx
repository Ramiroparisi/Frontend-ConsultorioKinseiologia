import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import '../../estilos/turnoNuevoPaciente.css';

interface Kinesiologo {
  id: number;
  apellido: string;
}

interface Especialidad {
  id: number;
  nombre: string;
  kinesiologos: Kinesiologo[];
}
interface Turno {
  id: number;
  fecha: Date;
  hora: string;
  paciente: { nombre: string };
  kinesiologo: { apellido: string };
}

const CrearTurnoPaciente = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [kinesiologos, setKinesiologos] = useState<Kinesiologo[]>([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<number | null>(null);
  const [selectedKinesiologo, setSelectedKinesiologo] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const navigate = useNavigate();

  // Obtener especialidades al cargar el componente
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch('/api/especialidades');
        const data = await response.json();
        setEspecialidades(data.data);
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
      }
    };
    fetchEspecialidades();
  }, []);

  // Obtener kinesiólogos al seleccionar una especialidad
  useEffect(() => {
    if (selectedEspecialidad) {
      const fetchKinesiologos = async () => {
        try {
          const response = await fetch(`/api/especialidades/${selectedEspecialidad}/kinesiologos`);
          const data = await response.json();
          setKinesiologos(data.data);
        } catch (error) {
          console.error('Error al obtener los kinesiólogos:', error);
        }
      };
      fetchKinesiologos();
    }
  }, [selectedEspecialidad]);

  // Obtener horas disponibles al seleccionar una fecha
  useEffect(() => {
    if (selectedDate && selectedKinesiologo) {
      const fetchAvailableHours = async () => {
        try {
          const formattedDate = selectedDate.toISOString().split('T')[0];
          const response = await fetch(`/api/turnos/${selectedKinesiologo}?date=${formattedDate}`);
          const turnos = await response.json();

          // Generar horarios de 9 a 18, excluyendo los ya asignados
          const allHours = Array.from({ length: 10 }, (_, i) => `${9 + i}:00`);
          const assignedHours = turnos.data.map((turno: Turno) => turno.hora);
          const availableHours = allHours.filter(hour => !assignedHours.includes(hour));

          setAvailableHours(availableHours);
        } catch (error) {
          console.error('Error al obtener las horas disponibles:', error);
        }
      };
      fetchAvailableHours();
    }
  }, [selectedDate, selectedKinesiologo]);

  // Confirmar el turno
  const handleConfirm = async () => {
    if (selectedKinesiologo && selectedDate && availableHours.length > 0) {
      const selectedHour = availableHours[0]; // Puedes cambiar para seleccionar otra hora de la lista
      try {
        const response = await fetch('/api/turnos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            kinesiologoId: selectedKinesiologo,
            fecha: selectedDate,
            hora: selectedHour,
          }),
        });
        if (response.ok) {
          alert('Turno creado exitosamente');
          navigate('/dashboard');
        } else {
          throw new Error('Error al crear el turno');
        }
      } catch (error) {
        console.error('Error al confirmar el turno:', error);
      }
    }
  };

  // Solo permite seleccionar días hábiles (lunes a viernes)
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <div className="container">
      <h1>Crear Turno</h1>
      <div className="form-group">
        <label>Especialidad:</label>
        <select
          className="form-control"
          value={selectedEspecialidad || ''}
          onChange={(e) => setSelectedEspecialidad(Number(e.target.value))}
        >
          <option value="">Seleccione una especialidad</option>
          {especialidades.map((especialidad) => (
            <option key={especialidad.id} value={especialidad.id}>
              {especialidad.nombre}
            </option>
          ))}
        </select>
      </div>
      {selectedEspecialidad && (
        <div className="form-group">
          <label>Kinesiólogo:</label>
          <select
            className="form-control"
            value={selectedKinesiologo || ''}
            onChange={(e) => setSelectedKinesiologo(Number(e.target.value))}
          >
            <option value="">Seleccione un kinesiólogo</option>
            {kinesiologos.map((kine) => (
              <option key={kine.id} value={kine.id}>
                {kine.apellido}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedKinesiologo && (
        <div className="form-group">
          <label>Fecha:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            filterDate={isWeekday}
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
        </div>
      )}
      {selectedDate && availableHours.length > 0 && (
        <div className="form-group">
          <label>Horas disponibles:</label>
          <select className="form-control">
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
      )}
      <button className="btn btn-primary mt-3" onClick={handleConfirm}>
        Confirmar Turno
      </button>
    </div>
  );
};

export default CrearTurnoPaciente;

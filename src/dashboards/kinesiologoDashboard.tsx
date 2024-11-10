import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../estilos/kinesiologoDash.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Kinesiologo {
  nombre: string;
  apellido: string;
  turnos: Turno[];
}

interface Turno {
  id: number;
  fecha: Date;
  hora: string;
  estado: string;
  importeTotal: number;
  paciente: Paciente;
  kinesiologo: number;
}

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
}

const KinesiologoDashboard: React.FC = () => {
  const [turnosPendientes, setTurnosPendientes] = useState<Turno[]>([]);
  const [turnosRealizados, setTurnosRealizados] = useState<Turno[]>([]);
  const [kinesiologo, setKinesiologo] = useState<Kinesiologo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatosKinesiologo = async () => {
      try {
        const response = await fetch('/api/kinesiologos/turnos', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();

        setKinesiologo({
          nombre: data.nombre,
          apellido: data.apellido,
          turnos: data.turnos,
        });

        // Ordeno los turnos
        const turnosPendientesOrdenados = data.turnos
          .filter((turno: Turno) => turno.estado === 'Activo')
          .sort((a: Turno, b: Turno) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime() || a.hora.localeCompare(b.hora));

        const turnosRealizadosOrdenados = data.turnos
          .filter((turno: Turno) => turno.estado === 'Realizado')
          .sort((a: Turno, b: Turno) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime() || a.hora.localeCompare(b.hora));

        setTurnosPendientes(turnosPendientesOrdenados);
        setTurnosRealizados(turnosRealizadosOrdenados);
      } catch (error) {
        console.error('Error al obtener los datos del paciente:', error);
        navigate('/');
      }
    };

    obtenerDatosKinesiologo();
  }, [navigate]);

  const eliminarTurno = async (turnoId: number) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas cancelar este turno?");
    if (confirmar) {
      try {
        const response = await fetch(`/api/turnos/${turnoId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Error al cancelar el turno');
        }
        setTurnosPendientes(prevTurnos => prevTurnos.filter(turno => turno.id !== turnoId));
      } catch (error) {
        console.error('Error al cancelar el turno:', error);
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const turnosFiltrados = turnosPendientes.filter(turno => {
    const fechaTurno = new Date(turno.fecha).toDateString();
    const fechaSeleccionada = selectedDate ? selectedDate.toDateString() : null;

    const coincideFecha = !selectedDate || fechaTurno === fechaSeleccionada;
    const coincideBusqueda = turno.paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             turno.paciente.apellido.toLowerCase().includes(searchTerm.toLowerCase());

    return coincideFecha && coincideBusqueda;
  });

  return (
    <div className="dashboard">
      <div className="container pt-4 pb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="titulo">Bienvenido, {kinesiologo?.nombre} {kinesiologo?.apellido}</h1>
        </div>

        <div className="d-flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control"
          />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Selecciona una fecha"
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
        </div>

        <div className="dashboard-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-clock-history"></i>
            <h2 className="subtitulos">Turnos Pendientes</h2>
          </div>

          {turnosFiltrados.map((turno, index) => (
            <div key={index} className="appointment-row">
              <div className="d-flex align-items-center">
                <span className="appointment-icon">
                  <i className="bi bi-calendar"></i>
                </span>
                <span className="me-2">{new Date(turno.fecha).toLocaleDateString()}</span>
                <span className="appointment-icon me-2">
                  <i className="bi bi-clock"></i>
                </span>
                <span className="me-2">{turno.hora}</span>
                <span className="text-secondary">
                  - {turno.paciente.nombre} {turno.paciente.apellido}
                </span>
              </div>

              <div className="appointment-actions">
                <button
                  className="btn btn-link text-danger p-1"
                  onClick={() => eliminarTurno(turno.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="check-icon">
              <i className="bi bi-check-lg"></i>
            </span>
            <h2 className="subtitulos">Turnos Asistidos</h2>
          </div>

          {turnosRealizados.map((turno, index) => (
            <div key={index} className="appointment-row">
              <div className="d-flex align-items-center">
                <span className="appointment-icon me-2">
                  <i className="bi bi-calendar"></i>
                </span>
                <span className="me-2">{new Date(turno.fecha).toLocaleDateString()}</span>
                <span className="appointment-icon me-2">
                  <i className="bi bi-clock"></i>
                </span>
                <span className="me-2">{turno.hora}</span>
                <span className="text-secondary">
                  - {turno.paciente.nombre} {turno.paciente.apellido}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KinesiologoDashboard;

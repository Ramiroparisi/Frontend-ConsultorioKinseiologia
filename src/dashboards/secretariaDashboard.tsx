import { useState, useEffect } from 'react';
import '../estilos/pacienteDash.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

interface Turno {
  id: number;
  fecha: Date;
  hora: string;
  paciente: { nombre: string; apellido: string };
  kinesiologo: { apellido: string };
}

const SecretariaDashboard = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [turnosPendientes, setTurnosPendientes] = useState<Turno[]>([]);
  const [turnosRealizados, setTurnosRealizados] = useState<Turno[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showRealizados, setShowRealizados] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerTurnos = async () => {
      try {
        const response = await fetch('/api/turnos');
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        const data = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error(
            'La respuesta de la API no contiene un array en la propiedad "data"'
          );
        }
        setTurnos(data.data);
      } catch (error) {
        console.error('Error al obtener los turnos:', error);
      }
    };

    obtenerTurnos();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    const ahora = new Date();

    const pendientes = turnos.filter((turno) => {
      const fechaTurno = new Date(turno.fecha);
      const [hora, minutos] = turno.hora.split(':').map(Number);
      fechaTurno.setHours(hora, minutos, 0, 0);

      return (
        fechaTurno.getTime() > ahora.getTime() &&
        fechaTurno.toDateString() === selectedDate.toDateString()
      );
    });

    const realizados = turnos.filter((turno) => {
      const fechaTurno = new Date(turno.fecha);
      const [hora, minutos] = turno.hora.split(':').map(Number);
      fechaTurno.setHours(hora, minutos, 0, 0);

      return (
        fechaTurno.getTime() <= ahora.getTime() &&
        fechaTurno.toDateString() === selectedDate.toDateString()
      );
    });

    pendientes.sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
    realizados.sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );

    setTurnosPendientes(pendientes);
    setTurnosRealizados(realizados);
  }, [turnos, selectedDate]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleDelete = async (turnoId: number) => {
    if (window.confirm('¿Desea eliminar el turno?')) {
      try {
        const response = await fetch(`/api/turnos/${turnoId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error al eliminar el turno');

        setTurnos((prev) => prev.filter((turno) => turno.id !== turnoId));
        setTurnosPendientes((prev) =>
          prev.filter((turno) => turno.id !== turnoId)
        );
        setTurnosRealizados((prev) =>
          prev.filter((turno) => turno.id !== turnoId)
        );
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="container pt-4 pb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="dashboard-title">
            Bienvenido/a (nombre de la secretaria)
          </h1>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
        </div>

        <div className="dashboard-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="check-icon">
              <i className="bi bi-check-lg"></i>
            </span>
            <h2 className="section-title text-color mb-0">Turnos Realizados</h2>
            <button
              className="btn btn-link text-primary"
              onClick={() => setShowRealizados(!showRealizados)}
            >
              {showRealizados ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          {showRealizados &&
            (turnosRealizados.length > 0 ? (
              turnosRealizados.map((turno) => (
                <div key={turno.id} className="appointment-row">
                  <div className="d-flex align-items-center">
                    <span className="appointment-icon me-2">
                      <i className="bi bi-calendar"></i>
                    </span>
                    <span className="me-2">
                      {new Date(turno.fecha).toLocaleDateString()}
                    </span>
                    <span className="appointment-icon me-2">
                      <i className="bi bi-clock"></i>
                    </span>
                    <span className="me-2">{turno.hora}</span>
                    <span className="text-secondary">
                      - lic {turno.kinesiologo.apellido} - pac{' '}
                      {turno.paciente.nombre} {turno.paciente.apellido}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay turnos realizados para esta fecha.</p>
            ))}
        </div>

        <div className="dashboard-card">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="pending-icon">
              <i className="bi bi-clock-history"></i>
            </span>
            <h2 className="section-title text-color mb-0">Turnos Pendientes</h2>
          </div>

          {turnosPendientes.length > 0 ? (
            turnosPendientes.map((turno) => (
              <div
                key={turno.id}
                className="appointment-row d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <span className="appointment-icon me-2">
                    <i className="bi bi-calendar"></i>
                  </span>
                  <span className="me-2">
                    {new Date(turno.fecha).toLocaleDateString()}
                  </span>
                  <span className="appointment-icon me-2">
                    <i className="bi bi-clock"></i>
                  </span>
                  <span className="me-2">{turno.hora}</span>
                  <span className="text-secondary">
                    - lic {turno.kinesiologo.apellido} - pac{' '}
                    {turno.paciente.nombre} {turno.paciente.apellido}
                  </span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(turno.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))
          ) : (
            <p>No hay turnos pendientes.</p>
          )}

          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handleNavigation('/turnoNuevoSecretaria')}
            >
              Solicitar nuevo turno
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretariaDashboard;

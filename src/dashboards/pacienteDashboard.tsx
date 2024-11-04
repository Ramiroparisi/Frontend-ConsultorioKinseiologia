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
  kinesiologo: { apellido: string };
}

const PacienteDashboard = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [turnosPendientes, setTurnosPendientes] = useState<Turno[]>([]);
  const [turnosRealizados, setTurnosRealizados] = useState<Turno[]>([]);
  const [showRealizados, setShowRealizados] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerTurnos = async () => {
      try {
        const response = await fetch('/api/turnos');
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error('La respuesta de la API no contiene un array en la propiedad "data"');
        }
        setTurnos(data.data);
      } catch (error) {
        console.error('Error al obtener los turnos:', error);
      }
    };

    obtenerTurnos();
  }, []);

  useEffect(() => {
    const pendientes = turnos.filter(turno => new Date(turno.fecha) > new Date());
    const realizados = turnos.filter(turno => new Date(turno.fecha) <= new Date());

    pendientes.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      const [horaA, minutosA] = a.hora.split(':').map(Number);
      const [horaB, minutosB] = b.hora.split(':').map(Number);
      fechaA.setHours(horaA, minutosA, 0, 0);
      fechaB.setHours(horaB, minutosB, 0, 0);
      return fechaA.getTime() - fechaB.getTime();
    });

    realizados.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      const [horaA, minutosA] = a.hora.split(':').map(Number);
      const [horaB, minutosB] = b.hora.split(':').map(Number);
      fechaA.setHours(horaA, minutosA, 0, 0);
      fechaB.setHours(horaB, minutosB, 0, 0);
      return fechaA.getTime() - fechaB.getTime();
    });

    setTurnosPendientes(pendientes);
    setTurnosRealizados(realizados);
  }, [turnos]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleDelete = async (turnoId: number) => {
    if (window.confirm('¿Desea eliminar el turno?')) {
      try {
        const response = await fetch(`/api/turnos/${turnoId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el turno');
        }
        setTurnos(prev => prev.filter(turno => turno.id !== turnoId));
        setTurnosPendientes(prev => prev.filter(turno => turno.id !== turnoId));
        setTurnosRealizados(prev => prev.filter(turno => turno.id !== turnoId));
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="container pt-4 pb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="dashboard-title">Bienvenido</h1>
          <DatePicker
            selected={new Date()}
            onChange={() => {}}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            disabled
          />
        </div>

        <div className="dashboard-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="pending-icon">
              <i className="bi bi-clock-history"></i>
            </span>
            <h2 className="section-title text-color mb-0">Turnos Pendientes</h2>
          </div>

          {turnosPendientes.length > 0 ? (
            turnosPendientes.map((turno) => (
              <div key={turno.id} className="appointment-row d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="appointment-icon me-2">
                    <i className="bi bi-calendar"></i>
                  </span>
                  <span className="me-2">{new Date(turno.fecha).toLocaleDateString()}</span>
                  <span className="appointment-icon me-2">
                    <i className="bi bi-clock"></i>
                  </span>
                  <span className="me-2">{turno.hora}</span>
                  <span className="text-secondary">- lic {turno.kinesiologo.apellido}</span>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(turno.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))
          ) : (
            <p>No hay turnos pendientes.</p>
          )}
          <div className="d-flex justify-content-center mt-4">
            <button type="button" className="btn btn-dark" onClick={() => handleNavigation('/turnoNuevoPaciente')}>Solicitar nuevo turno</button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="check-icon">
              <i className="bi bi-check-lg"></i>
            </span>
            <h2 className="section-title text-color mb-0">Turnos Realizados</h2>
            <button className="btn btn-link text-primary" onClick={() => setShowRealizados(!showRealizados)}>
              {showRealizados ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          {showRealizados && (
            turnosRealizados.length > 0 ? (
              turnosRealizados.map((turno) => (
                <div key={turno.id} className="appointment-row">
                  <div className="d-flex align-items-center">
                    <span className="appointment-icon me-2">
                      <i className="bi bi-calendar"></i>
                    </span>
                    <span className="me-2">{new Date(turno.fecha).toLocaleDateString()}</span>
                    <span className="appointment-icon me-2">
                      <i className="bi bi-clock"></i>
                    </span>
                    <span className="me-2">{turno.hora}</span>
                    <span className="text-secondary">- lic {turno.kinesiologo.apellido}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay turnos realizados para esta fecha.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PacienteDashboard;

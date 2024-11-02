import { useState, useEffect } from 'react';
import '../estilos/kinesiologoDash.css'; // Usamos el mismo estilo que en el Dashboard del paciente
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Turno {
  id: number;
  fecha: Date;
  hora: string;
  paciente: { nombre: string };
}

const KinesiologoDashboard = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [turnosPendientes, setTurnosPendientes] = useState<Turno[]>([]);
  const [turnosRealizados, setTurnosRealizados] = useState<Turno[]>([]);

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
        const hoy = new Date();
        const turnosDelDia = data.data.filter((turno: Turno) => {
          const fechaTurno = new Date(turno.fecha);
          return (
            fechaTurno.getDate() === hoy.getDate() &&
            fechaTurno.getMonth() === hoy.getMonth() &&
            fechaTurno.getFullYear() === hoy.getFullYear()
          );
        });

        setTurnos(turnosDelDia);
      } catch (error) {
        console.error('Error al obtener los turnos:', error);
      }
    };

    obtenerTurnos();
  }, []);

  useEffect(() => {
    const ahora = new Date();
    const pendientes: Turno[] = [];
    const realizados: Turno[] = [];

    turnos.forEach((turno) => {
      const [hora, minutos] = turno.hora.split(':').map(Number);
      const fechaTurno = new Date(turno.fecha);
      fechaTurno.setHours(hora, minutos, 0, 0);

      if (fechaTurno > ahora) {
        pendientes.push(turno);
      } else {
        realizados.push(turno);
      }
    });

    setTurnosPendientes(pendientes);
    setTurnosRealizados(realizados);
  }, [turnos]);

  return (
    <div className="dashboard">
      <div className="container pt-4 pb-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="dashboard-title">Bienvenido/a, Kinesiólogo/a</h1>
        </div>

        {/* Card de Turnos Realizados */}
        <div className="dashboard-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="check-icon">
              <i className="bi bi-check-lg"></i>
            </span>
            <h2 className="section-title text-color mb-0">Turnos Realizados</h2>
          </div>
          
          {turnosRealizados.length > 0 ? (
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
                  <span className="text-secondary">- {turno.paciente.nombre}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No hay turnos realizados.</p>
          )}
        </div>

        {/* Card de Turnos Pendientes */}
        <div className="dashboard-card">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="pending-icon">
              <i className="bi bi-clock-history"></i>
            </span>
            <h2 className="section-title text-color mb-0">Turnos Pendientes</h2>
          </div>
          
          {turnosPendientes.length > 0 ? (
            turnosPendientes.map((turno) => (
              <div key={turno.id} className="appointment-row">
                <div className="d-flex align-items-center">
                  <span className="appointment-icon">
                    <i className="bi bi-calendar"></i>
                  </span>
                  <span className="me-2">{new Date(turno.fecha).toLocaleDateString()}</span>
                  <span className="appointment-icon me-2">
                    <i className="bi bi-clock"></i>
                  </span>
                  <span className="me-2">{turno.hora}</span>
                  <span className="text-secondary">- {turno.paciente.nombre}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No hay turnos pendientes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KinesiologoDashboard;

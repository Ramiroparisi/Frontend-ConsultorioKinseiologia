import { useState, useEffect } from 'react';
import '../estilos/kinesiologoDash.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Estado para la fecha seleccionada

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
    if (!selectedDate) return;

    const pendientes: Turno[] = [];
    const realizados: Turno[] = [];
    const ahora = new Date();

    turnos.forEach((turno) => {
      const [hora, minutos] = turno.hora.split(':').map(Number);
      const fechaTurno = new Date(turno.fecha);
      fechaTurno.setHours(hora, minutos, 0, 0);

      // Filtra los turnos del día seleccionado
      if (
        fechaTurno.getDate() === selectedDate.getDate() &&
        fechaTurno.getMonth() === selectedDate.getMonth() &&
        fechaTurno.getFullYear() === selectedDate.getFullYear()
      ) {
        if (fechaTurno > ahora) {
          pendientes.push(turno);
        } else {
          realizados.push(turno);
        }
      }
    });
  
  // Los ordeno de forma ascendente porque sino, estaban por orden de llegada
  pendientes.sort((a, b) => {
    const [horaA, minutosA] = a.hora.split(':').map(Number);
    const [horaB, minutosB] = b.hora.split(':').map(Number);
    return horaA - horaB || minutosA - minutosB;
  });

  realizados.sort((a, b) => {
    const [horaA, minutosA] = a.hora.split(':').map(Number);
    const [horaB, minutosB] = b.hora.split(':').map(Number);
    return horaA - horaB || minutosA - minutosB;
  });

    setTurnosPendientes(pendientes);
    setTurnosRealizados(realizados);
  }, [turnos, selectedDate]);

  return (
    <div className="dashboard">
      <div className="container pt-4 pb-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="dashboard-title">Bienvenido/a, Kinesiólogo/a</h1>
          {/* Selector de Fecha */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
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
            <p>No hay turnos realizados para esta fecha.</p>
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
           

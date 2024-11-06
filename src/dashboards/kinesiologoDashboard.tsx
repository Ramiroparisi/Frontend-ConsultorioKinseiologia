import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatosKinesiologo = async () => {
      try {
        const response = await fetch('/api/kinesiologos/turnos', {
          method: 'GET',
          credentials: 'include', // Incluye cookies en la solicitud
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();

        // Almacena los datos completos del paciente
        setKinesiologo({
          nombre: data.nombre,
          apellido: data.apellido,
          turnos: data.turnos,
        });

        // Divide los turnos en pendientes y realizados
        setTurnosPendientes(data.turnos.filter((turno: Turno) => turno.estado === 'Activo'));
        setTurnosRealizados(data.turnos.filter((turno: Turno) => turno.estado === 'Realizado'));
      } catch (error) {
        console.error('Error al obtener los datos del paciente:', error);
        navigate('/'); // Redirige al login si hay un error
      }
    };

    obtenerDatosKinesiologo();
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className="container pt-4 pb-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="dashboard-title">Bienvenido, {kinesiologo?.nombre} {kinesiologo?.apellido}</h1>
        </div>
  
        {/* Turnos Pendientes */}
        <div className="dashboard-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-clock-history"></i>
            <h2 className="section-title">Turnos Pendientes</h2>
          </div>
  
          {turnosPendientes.map((turno, index) => (
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
                <button className="btn btn-link text-primary p-1">
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-link text-danger p-1">
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
  
          <button className="btn btn-dark w-100 mt-3">Solicitar Nuevo Turno</button>
        </div>
  
        {/* Turnos Realizados */}
        <div className="dashboard-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="check-icon">
              <i className="bi bi-check-lg"></i>
            </span>
            <h2 className="section-title">Turnos Asistidos</h2>
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
                <span className="text-secondary">- 
                   {turno.paciente.nombre} {turno.paciente.apellido}
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

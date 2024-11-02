import { useState, useEffect } from 'react';
import '../estilos/kinesiologoDash.css';

interface Turno {
  id: number;
  fecha: string;
  paciente: string;
}

const KinesiologoDashboard = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [turnosPendientes, setTurnosPendientes] = useState<Turno[]>([]);

  useEffect(() => {
    // Función para obtener los turnos del día
    const obtenerTurnos = async () => {
      try {
        const response = await fetch('/api/turnos');
        const data: Turno[] = await response.json(); // Convertir la respuesta a JSON y tipar los datos
        const turnosDelDia = data.filter((turno: Turno) => {
          const fechaTurno = new Date(turno.fecha);
          const hoy = new Date();
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
    // Filtrar los turnos pendientes
    const ahora = new Date();
    const pendientes = turnos.filter((turno: Turno) => {
      const horaTurno = new Date(turno.fecha);
      return horaTurno > ahora;
    });
    setTurnosPendientes(pendientes);
  }, [turnos]);

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Turnos Pendientes</h2>
        {turnosPendientes.length > 0 ? (
          <ul>
            {turnosPendientes.map((turno: Turno) => (
              <li key={turno.id}>
                {new Date(turno.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {turno.paciente}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay turnos pendientes.</p>
        )}
      </div>
    </div>
  );
};

export default KinesiologoDashboard;
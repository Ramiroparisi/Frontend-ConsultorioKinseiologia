import '../estilos/pacienteDash.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DashboardPaciente = () => {
    const pendingAppointments = [
      {
        date: '2024-11-05',
        time: '10:00',
        doctor: 'Dr. López',
      },
      {
        date: '2024-11-20',
        time: '15:00',
        doctor: 'Dra. Martínez',
      }
    ];
  
    const pastAppointments = [
      {
        date: '2024-10-15',
        time: '09:00',
        doctor: 'Dr. García',
      },
      {
        date: '2024-10-01',
        time: '16:30',
        doctor: 'Dra. Rodríguez',
      }
    ];
  
    return (
      <div className="dashboard">
        <div className="container pt-4 pb-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="dashboard-title">Bienvenido, Juan Pérez</h1>
          </div>
  
          {/* Pending Appointments */}
          <div className="dashboard-card mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="pending-icon">
              <i className="bi bi-clock-history"></i>
              </span>
              <h2 className="section-title text-color mb-0">Turnos Pendientes</h2>
          </div>
            
          {pendingAppointments.map((appointment, index) => (
            <div key={index} className="appointment-row">
                <div className="d-flex align-items-center">
                <span className="appointment-icon">
                  <i className="bi bi-calendar"></i>
                </span>
                <span className="me-2">{appointment.date}</span>
                <span className="appointment-icon me-2">
                  <i className="bi bi-clock"></i>
                </span>
                <span className="me-2">{appointment.time}</span>
                <span className="text-secondary">- {appointment.doctor}</span>
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
  
            <button className="btn btn-dark w-100 mt-3">
              Solicitar Nuevo Turno
            </button>
          </div>
  
          {/* Past Appointments */}
          <div className="dashboard-card">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="check-icon">
              <i className="bi bi-check-lg"></i>
              </span>
              <h2 className="section-title text-color mb-0">Turnos Asistidos</h2>
            </div>
            
            {pastAppointments.map((appointment, index) => (
              <div key={index} className="appointment-row">
                <div className="d-flex align-items-center">
                  <span className="appointment-icon me-2">
                    <i className="bi bi-calendar"></i>
                  </span>
                  <span className="me-2">{appointment.date}</span>
                  <span className="appointment-icon me-2">
                    <i className="bi bi-clock"></i>
                  </span>
                  <span className="me-2">{appointment.time}</span>
                  <span className="text-secondary">- {appointment.doctor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardPaciente;
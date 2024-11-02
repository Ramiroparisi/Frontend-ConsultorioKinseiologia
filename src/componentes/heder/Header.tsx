import { useNavigate } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="#">
        <span className="brand">Mi consultorio</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link text-light" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#">
              About
            </a>
          </li>
        </ul>
        <div className="d-flex ms-3">
          <button className="btn btn-outline-primary me-2" onClick={() => handleNavigation('/')}>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
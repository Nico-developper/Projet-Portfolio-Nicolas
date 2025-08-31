import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/Header.scss';
import { isAuthenticated, logout } from '@/services/authService';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">
          <Link to="/" onClick={closeMenu}>
            Nicolas Développeur
          </Link>
        </h1>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>
                À propos
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={closeMenu}>
                Projets
              </Link>
            </li>
            <li>
              <Link to="/parcours" onClick={closeMenu}>
                Parcours
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
            {isAuthenticated() ? (
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Déconnexion
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={closeMenu}>
                  Connexion
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <button
          className={`burger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

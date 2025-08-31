import React from 'react';
import '../styles/components/Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Nicolas Développeur. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:contact@nicolas.dev">Email</a>
        </div>
      </div>
    </footer>
  );
}

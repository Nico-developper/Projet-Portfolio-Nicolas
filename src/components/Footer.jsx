import React from 'react';
import '../styles/components/Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Nicolas Développeur. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="https://github.com/Nico-developper" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nicolas-billiere-1454b813b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:nico.billiere@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}

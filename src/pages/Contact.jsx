import React from 'react';
import '../styles/pages/Contact.scss';
import Seo from '../components/Seo';

export default function Contact() {
  return (
    <section className="contact">
      <Seo
        title="Contact - Nicolas Développeur"
        description="Contactez-moi pour un projet web, une mission ou une collaboration."
      />
      <div className="container">
        {/* Nouveau wrapper pour encadrer le titre + formulaire */}
        <div className="contact-panel">
          <h2>Contactez-moi</h2>
          <p className="contact-lead">Un projet, une question ? N’hésitez pas à m’écrire !</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input id="name" name="name" type="text" placeholder="Votre nom" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Votre email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Votre message" required />
            </div>

            <button type="submit" className="submit-btn">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

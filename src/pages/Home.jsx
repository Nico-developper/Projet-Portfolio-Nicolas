import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.scss';
import Skills from '../components/Skills';
import SkillsLanguage from '../components/SkillsLanguage';
import Seo from '../components/Seo';
import nicoImg from '@/assets/Nico.png'; // adapte le chemin si besoin

const competences = [
  { name: 'Intégration HTML/CSS', level: 5 },
  { name: 'Accessibilité (a11y)', level: 4 },
  { name: 'SEO & Performance', level: 4 },
  { name: 'Git & GitHub', level: 5 },
  { name: 'Gestion de projet', level: 4 },
  { name: 'Tests & Debug', level: 3 },
];

const languages = [
  { name: 'HTML5', value: 95 },
  { name: 'CSS / SCSS', value: 90 },
  { name: 'JavaScript (ES6+)', value: 85 },
  { name: 'React', value: 80 },
  { name: 'Node.js / Express', value: 70 },
  { name: 'MongoDB', value: 65 },
];

export default function Home() {
  return (
    <div className="home-page">
      <Seo title="Accueil - Nicolas Développeur Web" />

      <section className="hero">
        <div className="container">
          <div className="home__content">
            <h1>Bienvenue, moi c'est Nicolas</h1>
            <h2>Développeur Web Junior</h2>
            <p>
              Développeur web basé à La Réunion, je conçois des sites modernes, performants et
              accessibles. Mon objectif : transformer vos idées en expériences web engageantes,
              efficaces et sur-mesure. Besoin d’un site vitrine, d’une interface React ou d’un
              back-end robuste ? Parlons-en !
            </p>
            <div className="home__cta">
              <Link to="/projects" className="btn">
                Voir mes projets
              </Link>
              <Link to="/contact" className="btn">
                Me contacter
              </Link>
            </div>
          </div>

          <div className="home__img">
            <div className="photo-fade">
              <img src={nicoImg} alt="Portrait de Nicolas" />
            </div>
          </div>
        </div>
      </section>

      <section className="skills-section container">
        <Skills competences={competences} />
        <SkillsLanguage languages={languages} />
      </section>
    </div>
  );
}

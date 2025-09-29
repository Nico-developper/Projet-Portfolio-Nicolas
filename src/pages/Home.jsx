import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.scss';
import Skills from '../components/Skills';
import SkillsLanguage from '../components/SkillsLanguage';
import Seo from '../components/Seo';
import nicoImg from '@/assets/nico-logo.jpg'; // adapte le chemin si besoin

const competences = [
  { name: 'Intégration HTML/CSS', level: 3 },
  { name: 'Accessibilité (a11y)', level: 3 },
  { name: 'SEO & Performance', level: 2 },
  { name: 'Management équipe', level: 3 },
  { name: 'Gestion de projet', level: 3 },
  { name: 'Tests & Debug', level: 2 },
];

const languages = [
  { name: 'HTML5', value: 55 },
  { name: 'CSS / SCSS', value: 55 },
  { name: 'JavaScript (ES6+)', value: 45 },
  { name: 'React', value: 45 },
  { name: 'TypeScript', value: 5 },
  { name: 'C#', value: 5 },
  { name: 'Python', value: 5 },
  { name: 'PHP', value: 0 },
  { name: 'Java', value: 0 },
  { name: 'C', value: 0 },
  { name: 'C++', value: 0 },
  { name: 'SQL', value: 5 },
  { name: 'NoSQL', value: 15 },
  { name: 'Git & GitHub', value: 50 },
  { name: 'Node.js / Express', value: 35 },
  { name: 'TypeScript / Angular', value: 0 },
  { name: 'Wordpress', value: 0 },
  { name: 'Bootstrap', value: 0 },
];

export default function Home() {
  const heroRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (heroRef.current) io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="home-page">
      <Seo title="Accueil - Nicolas Développeur Web" />

      {/* HERO XL */}
      <section ref={heroRef} className={`hero hero--xl ${visible ? 'is-visible' : ''}`}>
        <div className="hero__bg" aria-hidden="true">
          <span className="hero__halo hero__halo--1" />
          <span className="hero__halo hero__halo--2" />
        </div>

        <div className="container hero__container">
          <div className="hero__content">
            {/* (kicker supprimé) */}

            <h1 className="hero__title">
              <span className="reveal">Développeur Web</span>
              <span className="gradient-stroke reveal" style={{ '--delay': '100ms' }}>
                Front&nbsp;&middot;&nbsp;Back&nbsp;&middot;&nbsp;SEO
              </span>
            </h1>

            {/* Texte précédent remis */}
            <p className="hero__subtitle reveal" style={{ '--delay': '200ms' }}>
              Développeur web basé à La Réunion, je conçois des sites modernes, performants et
              accessibles. Mon objectif : transformer vos idées en expériences web engageantes,
              efficaces et sur-mesure. Besoin d’un site vitrine, d’une interface React ou d’un
              back-end robuste ? Parlons-en !
            </p>

            {/* puces techno supprimées */}

            <div className="hero__cta reveal" style={{ '--delay': '300ms' }}>
              <Link to="/projects" className="btn">
                Voir mes projets
              </Link>
              <Link to="/contact" className="btn">
                Me contacter
              </Link>
            </div>
          </div>

          <figure className="portrait reveal" style={{ '--delay': '160ms' }}>
            <img src={nicoImg} alt="Nicolas Billière" loading="eager" />
          </figure>
        </div>
      </section>

      {/* Skills */}
      <section className="skills-section container">
        <Skills competences={competences} />
        <SkillsLanguage
          languages={languages}
          countDurationMs={2200}
          barDurationMs={1400}
          staggerMs={120}
        />
      </section>
    </div>
  );
}

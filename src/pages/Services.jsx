import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import '../styles/pages/Services.scss';

const services = [
  {
    title: 'Site vitrine moderne',
    desc: 'Conception de sites clairs, rapides et accessibles pour présenter votre activité.',
    bullets: [
      'Design responsive (desktop/tablette/mobile)',
      'Intégration HTML/SCSS soignée',
      'Bonnes pratiques SEO (balises, sémantique)',
      'Performances & accessibilité (a11y) de base',
    ],
  },
  {
    title: 'Application React (SPA)',
    desc: 'Interfaces réactives et évolutives pour des besoins plus avancés.',
    bullets: [
      'React + Router, state management léger',
      'Composants réutilisables & testables',
      'Intégration API REST/JSON',
      'Animations fines et UX soignée',
    ],
  },
  {
    title: 'Back-end & API (Node/Express)',
    desc: 'API sécurisée pour vos formulaires, contenus et applications.',
    bullets: [
      'Node.js + Express',
      'MongoDB (Atlas) & modèles de données',
      'Auth JWT (inscription/connexion)',
      'Validation & bonnes pratiques',
    ],
  },
  {
    title: 'Optimisation Perf / SEO / a11y',
    desc: 'Gagnez en vitesse, visibilité et inclusivité.',
    bullets: [
      'Audit Lighthouse & rapport priorisé',
      'Correction images/HTML/CSS/JS',
      'Amélioration Core Web Vitals',
      'Correctifs accessibilité (WCAG) pragmatiques',
    ],
  },
  {
    title: 'Refonte & migration',
    desc: 'Modernisez votre site sans perdre votre référencement.',
    bullets: [
      'Reprise contenu & redirections',
      'Nettoyage technique & dette CSS/JS',
      'Durcissement sécurité de base',
      'Plan de déploiement et rollback',
    ],
  },
  {
    title: 'Maintenance & évolutions',
    desc: 'Gardez votre site à jour et ajoutez des fonctionnalités au fil de l’eau.',
    bullets: [
      'Mises à jour, sauvegardes, petite TMA',
      'Corrections sous 48–72h ouvrées',
      'Monitoring basique',
      'Conseils d’évolution',
    ],
  },
];

const forfaitsProjet = [
  {
    name: 'Vitrine One-Page',
    price: 'à partir de 690 €',
    details: ['1 page structurée', 'Design responsive', 'SEO de base', 'Formulaire de contact'],
    note: 'Idéal pour démarrer vite et bien.',
  },
  {
    name: 'Vitrine 4–6 pages',
    price: 'à partir de 1 290 €',
    details: [
      'Accueil + 3–5 pages',
      'Charte & SCSS modulaire',
      'SEO on-page',
      'Formation prise en main',
    ],
    note: 'Le meilleur équilibre contenu / budget.',
  },
  {
    name: 'App React (v1)',
    price: 'à partir de 1 800 €',
    details: ['Architecture SPA', 'Routes & états', 'Intégration API', 'Animations & UX'],
    note: 'Pour un produit interactif avec bases solides.',
  },
  {
    name: 'API Node/Express',
    price: 'à partir de 900 €',
    details: ['CRUD sécurisé', 'MongoDB Atlas', 'Auth JWT', 'Validation & logs'],
    note: 'Back-end prêt pour une mise en prod simple.',
  },
  {
    name: 'Pack Optimisation',
    price: 'à partir de 390 € (audit) / 590 € (sprint)',
    details: ['Audit complet & plan d’action', 'Optimisations ciblées', 'Rapport avant/après'],
    note: 'Boost mesurable des perfs & SEO.',
  },
];

const abonnements = [
  {
    name: 'Maintenance Basic',
    price: '49 €/mois',
    details: [
      'Mises à jour mensuelles',
      'Sauvegarde 1×/mois',
      'Correctifs mineurs',
      'Support par email',
    ],
  },
  {
    name: 'Maintenance Pro',
    price: '99 €/mois',
    details: [
      'Mises à jour bimensuelles',
      'Sauvegarde 1×/semaine',
      'Correctifs priorisés',
      '1h d’évolutions/mois',
    ],
    highlight: true,
  },
  {
    name: 'Maintenance Business',
    price: '169 €/mois',
    details: [
      'MàJ hebdomadaires',
      'Sauvegarde quotidienne',
      'SLA D+1 ouvré',
      '3h d’évolutions/mois',
    ],
  },
];

export default function Services() {
  const pageRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (pageRef.current) io.observe(pageRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <main ref={pageRef} className={`services-page ${visible ? 'is-visible' : ''}`}>
      <Seo title="Services & Tarifs – Nicolas Développeur Web" />

      {/* HERO */}
      <section className="hero container">
        <div className="hero__text">
          <h1>Services & tarifs</h1>
          <p className="lead">
            Sites vitrines, apps React, APIs Node, optimisation performance/SEO/accessibilité,
            refontes et maintenance. Des solutions modernes, claires et efficaces — adaptées à votre
            budget.
          </p>
          <div className="hero__cta">
            <Link to="/contact" className="btn">
              Demander un devis
            </Link>
            <Link to="/projects" className="btn btn--ghost">
              Voir des projets
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container">
        <h2 className="section-title">Ce que je propose</h2>
        <div className="cards-grid">
          {services.map((s, i) => (
            <article
              className="card card--service"
              key={s.title}
              style={{ '--delay': `${i * 90}ms` }}
            >
              <h3 className="card__title">{s.title}</h3>
              <p className="card__desc">{s.desc}</p>
              <ul className="card__list">
                {s.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* TARIFS – FORFAITS */}
      <section className="container">
        <h2 className="section-title">Forfaits projet</h2>
        <div className="cards-grid">
          {forfaitsProjet.map((p, i) => (
            <article
              className="card card--pricing"
              key={p.name}
              style={{ '--delay': `${i * 90}ms` }}
            >
              <h3 className="card__title">{p.name}</h3>
              <div className="price">{p.price}</div>
              <ul className="card__list">
                {p.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
              {p.note && <p className="card__note">{p.note}</p>}
            </article>
          ))}
        </div>
        <p className="disclaimer">
          Les montants sont indicatifs «&nbsp;à partir de&nbsp;». Un devis précis est établi après
          un bref cadrage (objectifs, contenus, fonctionnalités, délais).
        </p>
      </section>

      {/* TARIFS – ABONNEMENTS */}
      <section className="container">
        <h2 className="section-title">Maintenance mensuelle</h2>
        <div className="cards-grid">
          {abonnements.map((p, i) => (
            <article
              className={`card card--pricing ${p.highlight ? 'is-highlight' : ''}`}
              key={p.name}
              style={{ '--delay': `${i * 90}ms` }}
            >
              <h3 className="card__title">{p.name}</h3>
              <div className="price">{p.price}</div>
              <ul className="card__list">
                {p.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* TARIFS – À LA JOURNÉE / HEURE */}
      <section className="container">
        <h2 className="section-title">Taux journaliers & horaires</h2>
        <div className="rate">
          <div className="rate__box">
            <div className="rate__label">TJM indicatif</div>
            <div className="rate__value">240 € / jour</div>
          </div>
          <div className="rate__box">
            <div className="rate__label">Tarif horaire indicatif</div>
            <div className="rate__value">35 € / h</div>
          </div>
        </div>
        <p className="disclaimer">
          Le choix se fait selon le type de mission : forfait (livrable défini), régie (TJM) ou
          petits besoins ponctuels (horaire).
        </p>
        <div className="hero__cta hero__cta--center">
          <Link to="/contact" className="btn">
            Parler de votre projet
          </Link>
        </div>
      </section>
    </main>
  );
}

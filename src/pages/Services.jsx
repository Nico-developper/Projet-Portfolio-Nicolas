import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import '../styles/pages/Services.scss';

const services = [
  {
    title: 'Site vitrine moderne',
    desc: 'Un site clair et élégant pour présenter votre activité et être trouvé sur Google.',
    bullets: [
      'Adapté ordinateur, tablette et mobile',
      'Mise en page soignée et lisible',
      'Référencement de base (titres, descriptions)',
      'Chargement rapide et accessible',
    ],
  },
  {
    title: 'Application web interactive',
    desc: 'Une interface plus avancée pour proposer des fonctionnalités sur mesure.',
    bullets: [
      'Navigation fluide entre les pages',
      'Blocs réutilisables pour évoluer facilement',
      'Connexion à vos données/serveurs',
      'Petites animations utiles pour l’ergonomie',
    ],
  },
  {
    title: 'Espace d’administration / API',
    desc: 'Un “panneau de contrôle” pour gérer contenus, formulaires et comptes.',
    bullets: [
      'Création / modification de contenus',
      'Sauvegarde sécurisée des données',
      'Comptes et connexions protégées',
      'Règles simples de sécurité',
    ],
  },
  {
    title: 'Booster votre site',
    desc: 'On identifie ce qui freine puis on améliore ce qui compte vraiment.',
    bullets: [
      'Audit avec priorités claires',
      'Images, code et structure optimisés',
      'Meilleures notes de performance',
      'Corrections d’accessibilité utiles',
    ],
  },
  {
    title: 'Refonte sereine',
    desc: 'On modernise sans perdre votre référencement ni vos contenus.',
    bullets: [
      'Récupération de vos pages',
      'Redirections propres (ancien → nouveau)',
      'Nettoyage technique',
      'Plan de mise en ligne sécurisé',
    ],
  },
  {
    title: 'Maintenance & petites évolutions',
    desc: 'Votre site reste à jour, sauvegardé et peut évoluer petit à petit.',
    bullets: [
      'Mises à jour régulières',
      'Sauvegardes et restauration',
      'Corrections sous 48–72 h ouvrées',
      'Conseils et petites améliorations',
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
    details: ['Accueil + 3–5 pages', 'Charte & SCSS modulaire', 'SEO on-page', 'Formation'],
    note: 'Le meilleur équilibre contenu / budget.',
  },
  {
    name: 'App web (v1)',
    price: 'à partir de 1 800 €',
    details: ['Structure évolutive', 'Navigation et états', 'Connexion aux données', 'UX soignée'],
    note: 'Pour un produit interactif avec bases solides.',
  },
  {
    name: 'Espace admin / API',
    price: 'à partir de 900 €',
    details: ['Gestion sécurisée', 'Base de données', 'Connexion protégée', 'Journalisation'],
    note: 'Prêt à être mis en ligne facilement.',
  },
  {
    name: 'Pack Optimisation',
    price: 'à partir de 390 € (audit) / 590 € (sprint)',
    details: ['Audit + plan d’action', 'Optimisations ciblées', 'Mesures avant / après'],
    note: 'Gains visibles sur perfs & SEO.',
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
      'Support email',
    ],
  },
  {
    name: 'Maintenance Pro',
    price: '99 €/mois',
    details: [
      'MàJ 2×/mois',
      'Sauvegarde 1×/semaine',
      'Priorité corrections',
      '1h d’évolutions/mois',
    ],
    highlight: true,
  },
  {
    name: 'Maintenance Business',
    price: '169 €/mois',
    details: ['MàJ hebdo', 'Sauvegarde quotidienne', 'SLA D+1 ouvré', '3h d’évolutions/mois'],
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
      <section className="hero container section">
        <div className="hero__text">
          <h1>Services & tarifs</h1>
          <p className="lead">
            Sites vitrines, applications web, espaces d’administration, optimisation et maintenance.
            Des solutions modernes, claires et efficaces, adaptées à votre budget.
          </p>
          <div className="hero__cta hero__cta--center">
            <Link to="/contact" className="btn">
              Demander un devis
            </Link>
            <Link to="/projects" className="btn">
              Voir des projets
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container section" aria-labelledby="services-title">
        <h2 id="services-title" className="section-title">
          Ce que je propose
        </h2>
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

      {/* FORFAITS */}
      <section className="container section" aria-labelledby="forfaits-title">
        <h2 id="forfaits-title" className="section-title">
          Forfaits projet
        </h2>
        <div className="cards-grid">
          {forfaitsProjet.map((p, i) => (
            <article
              className="card card--pricing"
              key={p.name}
              style={{ '--delay': `${i * 90}ms` }}
            >
              <header className="card__head">
                <h3 className="card__title">{p.name}</h3>
                <div className="badge-price" aria-label="Prix">
                  {p.price}
                </div>
              </header>
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
          Tarifs indiqués à titre de base. Un chiffrage précis est fourni après un court cadrage
          (objectifs, périmètre fonctionnel, contenus, planning).
        </p>
      </section>

      {/* ABONNEMENTS */}
      <section className="container section" aria-labelledby="abos-title">
        <h2 id="abos-title" className="section-title">
          Maintenance mensuelle
        </h2>
        <div className="cards-grid">
          {abonnements.map((p, i) => (
            <article
              className={`card card--pricing ${p.highlight ? 'is-highlight' : ''}`}
              key={p.name}
              style={{ '--delay': `${i * 90}ms` }}
            >
              <header className="card__head">
                <h3 className="card__title">{p.name}</h3>
                <div className="badge-price">{p.price}</div>
              </header>
              <ul className="card__list">
                {p.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* TAUX */}
      <section className="container section" aria-labelledby="rates-title">
        <h2 id="rates-title" className="section-title">
          Taux journaliers & horaires
        </h2>
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
          Le mode d’intervention s’adapte à votre besoin : au forfait (livrable défini), en régie au
          TJM pour un accompagnement continu, ou à l’heure pour des demandes ponctuelles.
        </p>

        {/* CTA centré */}
        <div className="hero__cta hero__cta--center">
          <Link to="/contact" className="btn">
            Parler de votre projet
          </Link>
        </div>
      </section>
    </main>
  );
}

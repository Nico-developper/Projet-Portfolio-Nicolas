import React from 'react';
import '../styles/components/ProgressTimeline.scss';

export default function ProgressTimeline({
  title = 'Rapport de progression – Nicolas',
  subtitle = 'Parcours de progression',
}) {
  const items = [
    {
      badge: '01',
      title: 'Début de parcours',
      lead: 'J’ai commencé par poser les fondations avec HTML, CSS et JavaScript, en créant des sites statiques et dynamiques.',
      bullets: [
        'J’ai appris la structure HTML sémantique.',
        'J’ai mis en place des mises en page responsives.',
        'J’ai utilisé JavaScript pour dynamiser le DOM.',
      ],
    },
    {
      badge: '02',
      title: 'Progression front-end',
      lead: 'J’ai consolidé mes acquis avec React, en créant des composants modulaires et en gérant des états complexes.',
      bullets: [
        'Projet Kasa : intégration d’un carrousel interactif, gestion de routes avec React Router, respect strict de maquettes Figma.',
        'Création de mon portfolio React avec SCSS personnalisé, organisation modulaire et responsive.',
      ],
    },
    {
      badge: '03',
      title: 'Compétences back-end',
      lead: 'Avec Node.js, Express et MongoDB, j’ai appris à développer une API sécurisée et connectée à une base de données cloud.',
      bullets: [
        'Projet Mon Vieux Grimoire : authentification via JWT, routes CRUD sécurisées, gestion d’images, contrôle d’accès.',
        'Application concrète dans mon portfolio : système d’authentification, ajout/modification/suppression de projets.',
      ],
    },
    {
      badge: '04',
      title: 'Optimisation & SEO',
      lead: 'J’ai acquis une expertise dans l’optimisation technique.',
      bullets: [
        'Projet Nina Carducci : amélioration du référencement naturel, intégration de données structurées, optimisation des performances et accessibilité.',
        'Je sais analyser un site existant, corriger les bugs et proposer des solutions durables.',
      ],
    },
    {
      badge: '05',
      title: 'Gestion de projet',
      lead: 'Je sais désormais planifier et présenter un projet de manière professionnelle.',
      bullets: [
        'Projet Menu Maker : construction d’un Kanban, suivi des user stories, rédaction d’un rapport de progression, soutenance simulée.',
        'Mise en pratique dans mes propres projets (portfolio, demandes externes).',
      ],
    },
    {
      badge: '06',
      title: 'Réalisations externes',
      lead: 'En parallèle de ma formation, j’ai travaillé sur des projets réels :',
      bullets: ['Site vitrine pour un gîte à La Réunion.'],
    },
    {
      badge: '07',
      title: 'Situation actuelle',
      lead: 'Je suis aujourd’hui capable de :',
      bullets: [
        'Développer un site complet full-stack (front + back).',
        'Optimiser un site existant (SEO, performances, accessibilité).',
        'Gérer un projet client de manière autonome et professionnelle.',
        'Présenter et défendre un projet devant un public technique ou non technique.',
      ],
      closing:
        'En clair, je possède un profil complet de développeur web junior, avec une spécialisation front-end (React + SCSS), une solide base back-end (Node/Express/MongoDB), et des compétences transversales en optimisation et gestion de projet.',
    },
  ];

  return (
    <section className="pt-wrapper" aria-labelledby="pt-title">
      <header className="pt-header">
        <h1 id="pt-title" className="pt-title">
          {title}
        </h1>
        {subtitle && <p className="pt-subtitle">{subtitle}</p>}
      </header>

      <ol className="pt-timeline" role="list">
        {items.map((it, idx) => (
          <li key={it.title} className={`pt-row ${idx % 2 === 0 ? 'pt-row-odd' : 'pt-row-even'}`}>
            <div className="pt-figure" aria-hidden>
              <span className="pt-badge">{it.badge}</span>
              <span className="pt-icon">{defaultIcon(idx)}</span>
            </div>

            <div className="pt-content">
              <h3 className="pt-item-title">{it.title}</h3>
              {it.lead && <p className="pt-lead">{it.lead}</p>}
              {it.bullets?.length > 0 && (
                <ul className="pt-list">
                  {it.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
              {it.closing && <p className="pt-closing">{it.closing}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* === icônes simples en SVG === */
function defaultIcon(index = 0) {
  const icons = [KpiIcon, TargetIcon, ClockIcon, BarsIcon, PagesIcon, StarIcon, CheckIcon];
  const Icon = icons[index % icons.length];
  return <Icon />;
}
const KpiIcon = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden>
    <rect x="8" y="6" width="32" height="36" rx="4" fill="currentColor" opacity=".15" />
    <rect x="12" y="30" width="4" height="8" rx="1" fill="currentColor" />
    <rect x="20" y="26" width="4" height="12" rx="1" fill="currentColor" />
    <rect x="28" y="20" width="4" height="18" rx="1" fill="currentColor" />
    <path d="M14 16h20" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const TargetIcon = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden>
    <circle cx="24" cy="24" r="16" fill="currentColor" opacity=".15" />
    <circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="24" cy="24" r="4" fill="currentColor" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden>
    <circle cx="24" cy="24" r="16" fill="currentColor" opacity=".15" />
    <path d="M24 14v10l6 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const BarsIcon = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden>
    <rect x="10" y="28" width="6" height="10" rx="1" fill="currentColor" />
    <rect x="20" y="22" width="6" height="16" rx="1" fill="currentColor" />
    <rect x="30" y="12" width="6" height="26" rx="1" fill="currentColor" />
  </svg>
);
const PagesIcon = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden>
    <rect x="12" y="10" width="24" height="28" rx="2" fill="currentColor" opacity=".15" />
    <rect x="16" y="16" width="16" height="2" fill="currentColor" />
    <rect x="16" y="22" width="16" height="2" fill="currentColor" />
    <rect x="16" y="28" width="12" height="2" fill="currentColor" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden>
    <path
      d="M24 6l6 12 13 2-9.5 9.2 2.2 13L24 36.8 12.3 42l2.2-13L5 20l13-2z"
      fill="currentColor"
      opacity=".9"
    />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden>
    <circle cx="24" cy="24" r="20" fill="currentColor" opacity=".12" />
    <path
      d="M16 24l6 6 12-12"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

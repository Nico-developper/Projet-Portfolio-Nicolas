import React from 'react';
import '../styles/pages/About.scss';
import Seo from '../components/Seo';
import Timeline from '../components/Timeline';
import aboutBg from '@/assets/a-propos.webp';

const items = [
  // Formations (gauche)
  {
    side: 'left',
    date: '2008–2009',
    title: 'BREVET DES COLLÈGES',
    subtitle: 'Collège Aliénor d’Aquitaine, Bordeaux',
    bullets: [],
  },
  {
    side: 'left',
    date: '2011–2012',
    title: 'Baccalauréat Technologique',
    subtitle: 'Spécialité comptabilité & finances — Lycée Charles Despiau, Mont-de-Marsan',
  },
  {
    side: 'left',
    date: '2012–2017',
    title: 'LICENCE STAPS Management',
    subtitle: 'UFR Staps, Bordeaux',
  },
  {
    side: 'left',
    date: '2025',
    title: 'Certification pro – Développeur informatique (Niv. 5, RNCP38145)',
    subtitle: 'OpenClassrooms',
    note: 'En attente de validation du jury',
  },

  // Expériences (droite)

  {
    side: 'right',
    date: 'Sept 2017 – Mars 2018',
    title: 'Les Maisons Quadri',
    subtitle: 'CDI 7 mois – Assistant technique / conducteur de travaux',
    bullets: [
      'Planification de chantiers, gestion d’équipes',
      'Suivi budgets, délais, relation clientèle',
    ],
  },
  {
    side: 'right',
    date: 'Avr 2018 – Mai 2019',
    title: 'Blue Valet',
    subtitle: 'CDI – Agent d’exploitation de stationnement',
    bullets: [
      'Gestion du stationnement voitures & voituriers',
      'Planification horaire, gestion des flux, relation client',
    ],
  },
  {
    side: 'right',
    date: 'Juin 2019 – Mai 2023',
    title: 'AST Groupe / DPLE',
    subtitle: 'CDI – Conducteur de travaux puis Responsable équipe dessin',
    bullets: [
      'Gestion de chantiers, équipes, budgets & délais',
      'Planification, correction de plans, management',
    ],
  },
];

export default function About() {
  return (
    <main>
      <section className="about" style={{ '--about-bg': `url(${aboutBg})` }}>
        <Seo
          title="À propos & Parcours – Nicolas Développeur"
          description="À propos, parcours, expériences et formations de Nicolas, développeur web."
        />

        <div className="container">
          {/* même fond via classe partagée */}
          <div className="about__text about__panel">
            <h2>À propos de moi</h2>

            <div className="about-content">
              <p>
                Bonjour, je m&apos;appelle <strong>Nicolas</strong>, développeur web passionné par
                les interfaces claires, performantes et accessibles. Après une première carrière
                dans un autre domaine, j’ai choisi de me reconvertir pour exercer un métier créatif
                et stimulant.
              </p>

              <p>
                Formé intensivement avec OpenClassrooms, j’ai mené plusieurs projets concrets mêlant
                intégration, développement front-end et back-end, optimisation des performances et
                gestion de projet.
              </p>

              <p>
                Aujourd’hui, je conçois des interfaces modernes et responsives, je développe avec{' '}
                <strong>React</strong>, <strong>Node.js</strong> et <strong>Express</strong>, et
                j’optimise les sites pour offrir une expérience rapide, accessible et bien
                référencée.
              </p>

              <p>
                Curieux et rigoureux, je recherche toujours des solutions efficaces et durables.
                Installé à La Réunion, je suis disponible pour répondre à vos demandes et apporter
                mon expertise.
              </p>

              <p>
                N’hésitez pas à parcourir mes projets ou à me contacter, je serais ravi d’échanger
                avec vous !
              </p>
            </div>
          </div>

          {/* timeline avec le même fond/bordure/ombre */}
          <div className="about__timeline about__panel" id="parcours">
            <h2>Mon parcours</h2>
            <p className="lead">
              Études, certifications et expériences professionnelles marquantes.
            </p>

            <Timeline
              items={items}
              animate
              staggerMs={120}
              order="desc"
              titleLeft="Formations"
              titleRight="Expériences"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

import React from 'react';
import '../styles/pages/About.scss';
import Seo from '../components/Seo';

export default function About() {
  return (
    <section className="about">
      <Seo
        title="À propos de moi – Nicolas Développeur"
        description="Parcours, compétences et valeurs de Nicolas, développeur web."
      />

      <div className="container">
        <div className="about__text">
          <h2>À propos de moi</h2>

          <div className="about-content">
            <p>
              Bonjour, je m'appelle <strong>Nicolas</strong>, développeur web passionné par les
              interfaces claires, performantes et accessibles. Après une première carrière dans un
              autre domaine, j’ai choisi de me reconvertir pour exercer un métier créatif et
              stimulant.
            </p>

            <p>
              Formé intensivement avec OpenClassrooms, j’ai mené plusieurs projets concrets mêlant
              intégration, développement front-end et back-end, optimisation des performances et
              gestion de projet.
            </p>

            <p>
              Aujourd’hui, je conçois des interfaces modernes et responsives, je développe avec{' '}
              <strong>React</strong>, <strong>Node.js</strong> et <strong>Express</strong>, et
              j’optimise les sites pour offrir une expérience rapide, accessible et bien référencée.
            </p>

            <p>
              Curieux et rigoureux, je recherche toujours des solutions efficaces et durables.
              Installé à La Réunion, je m’inspire de la nature et de mes passions sportives pour
              nourrir ma créativité.
            </p>

            <p>
              N’hésitez pas à parcourir mes projets ou à me contacter, je serais ravi d’échanger
              avec vous !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

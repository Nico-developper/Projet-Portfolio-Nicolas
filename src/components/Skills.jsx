import React from 'react';
import RatingStars from './RatingStars';
import '../styles/components/Skills.scss';

export default function Skills({ competences = [], titleCompetences = 'Compétences clés' }) {
  return (
    <section className="skills" aria-labelledby="skills-stars-title">
      <h3 id="skills-stars-title" className="skills__title">
        {titleCompetences}
      </h3>

      <div className="skills__grid skills__grid--stars">
        {competences.map((c, i) => (
          <article className="skills__card skills__card--stars" key={i}>
            <RatingStars label={c.name} value={c.level} />
          </article>
        ))}
      </div>
    </section>
  );
}

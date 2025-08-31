import React from "react";
import "../styles/components/SkillsLanguage.scss";

export default function SkillsLite({
  competences = [],
  languages = [],
  titleLanguages = "Langages & technologies",
}) {
  return (
    <section className="skills" aria-labelledby="skills-title">
      <h3 id="skills-title" className="skills__title">{titleLanguages}</h3>

      <div className="skills__grid">
        {languages.map((l, i) => (
          <article className="skills__card" key={`${l.name}-${i}`}>
            <div className="skills__name">{l.name}</div>

            <div
              className="skills__progress"
              role="progressbar"
              aria-valuenow={l.value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Niveau ${l.name}`}
            >
              <div
                className="skills__progress-bar"
                style={{ width: `${l.value}%` }}
              />
            </div>

            <div className="skills__percent" aria-hidden="true">
              {l.value}%
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

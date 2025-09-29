import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/SkillsLanguage.scss';

export default function SkillsLanguage({
  languages = [],
  titleLanguages = 'Langages & technologies',
  /** Durée pour le compteur numérique (ms) */
  countDurationMs = 2000,
  /** Durée de la transition de la barre (ms) */
  barDurationMs = 1200,
  /** Décalage entre chaque carte (ms) pour un effet en cascade */
  staggerMs = 80,
  /** Courbe d’aisance de la barre */
  easing = 'cubic-bezier(0.22, 1, 0.36, 1)', // easeOutCubic-like
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(() => languages.map(() => 0));
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => setReduced(mq.matches);
      apply();
      mq.addEventListener?.('change', apply);
      return () => mq.removeEventListener?.('change', apply);
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);

          const targets = languages.map((l) => Math.max(0, Math.min(100, l.value)));
          if (reduced) {
            setValues(targets);
          } else {
            const duration = Math.max(0, countDurationMs);
            const start = performance.now();
            const tick = (now) => {
              const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
              setValues(targets.map((v) => Math.round(v * t)));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }

          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.2 },
    );

    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [languages, countDurationMs, reduced]);

  return (
    <section ref={sectionRef} className="skills" aria-labelledby="skills-title">
      <h3 id="skills-title" className="skills__title">
        {titleLanguages}
      </h3>

      <div className="skills__grid">
        {languages.map((l, i) => {
          const target = Math.max(0, Math.min(100, l.value));
          const now = values[i] ?? 0;
          const width = visible ? `${target}%` : '0%';

          // Style de transition (ralenti + effet cascade). Désactivé si reduced.
          const barStyle = reduced
            ? { width, transition: 'none' }
            : {
                width,
                transition: `width ${barDurationMs}ms ${easing} ${i * staggerMs}ms`,
              };

          return (
            <article className="skills__card" key={`${l.name}-${i}`}>
              <div className="skills__name">{l.name}</div>

              <div
                className="skills__progress"
                role="progressbar"
                aria-valuenow={now}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Niveau ${l.name}`}
              >
                <div className="skills__progress-bar" style={barStyle} />
              </div>

              <div className="skills__percent" aria-hidden="true">
                {now}%
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

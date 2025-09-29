import React, { useEffect, useRef, useState, useMemo } from 'react';
import '../styles/components/Timeline.scss';

/**
 * Parse une date FR "flexible" (ex: "Janv–Avr 2016", "Saisons 2016–2017", "2025")
 * et retourne une clé numérique YYYYMM utilisable pour trier.
 * Si aucun mois détecté → 01 par défaut. Si aucune année → 0.
 */
function startKey(dateStr = '') {
  const s = String(dateStr).toLowerCase();
  const months = {
    janv: 1,
    jan: 1,
    janvier: 1,
    fev: 2,
    fév: 2,
    fevr: 2,
    février: 2,
    mars: 3,
    avr: 4,
    avril: 4,
    mai: 5,
    juin: 6,
    juil: 7,
    juillet: 7,
    aout: 8,
    août: 8,
    sept: 9,
    septembre: 9,
    oct: 10,
    octobre: 10,
    nov: 11,
    novembre: 11,
    dec: 12,
    décembre: 12,
    saison: 1,
    saisons: 1, // fallback pour "Saisons 2016–2017"
  };

  // année = premier AAAA rencontré
  const years = s.match(/\b(19|20)\d{2}\b/g);
  const year = years ? parseInt(years[0], 10) : 0;

  // mois = premier token mois trouvé
  let month = 1;
  for (const key of Object.keys(months)) {
    if (s.includes(key)) {
      month = months[key];
      break;
    }
  }
  return year * 100 + month; // ex: 201609
}

export default function Timeline({
  items = [],
  titleLeft = 'Formations',
  titleRight = 'Expériences',
  animate = true,
  staggerMs = 90,
  order = 'desc', // 'asc' (ancien → récent) ou 'desc'
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(!animate);

  // Trie les items par date de début, tout en respectant leur "side"
  const sorted = useMemo(() => {
    const copy = [...items];
    copy.sort((a, b) => {
      const ka = startKey(a.date);
      const kb = startKey(b.date);
      return order === 'desc' ? kb - ka : ka - kb;
    });
    return copy;
  }, [items, order]);

  useEffect(() => {
    if (!animate) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [animate]);

  return (
    <section
      ref={sectionRef}
      className={`timeline ${visible ? 'is-visible' : ''}`}
      aria-label="Parcours"
    >
      <div className="timeline__headers">
        <h3 className="timeline__col-title">{titleLeft}</h3>
        <div aria-hidden="true" className="timeline__rail-head" />
        <h3 className="timeline__col-title">{titleRight}</h3>
      </div>

      <ol className="timeline__grid">
        {sorted.map((it, idx) => (
          <li
            className={`timeline__row ${it.side === 'left' ? 'is-left' : 'is-right'}`}
            key={`${it.title}-${idx}`}
            style={{ '--delay': `${idx * staggerMs}ms` }}
          >
            <div className="timeline__col timeline__col--left">
              {it.side === 'left' && <Card item={it} />}
            </div>

            <div className="timeline__rail">
              <span className="timeline__dot" aria-hidden="true" />
              <span className="timeline__date">{it.date}</span>
            </div>

            <div className="timeline__col timeline__col--right">
              {it.side === 'right' && <Card item={it} />}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Card({ item }) {
  return (
    <article className="tl-card">
      <h4 className="tl-card__title">{item.title}</h4>
      {item.subtitle && <p className="tl-card__subtitle">{item.subtitle}</p>}
      {item.bullets?.length > 0 && (
        <ul className="tl-card__list">
          {item.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {item.note && <p className="tl-card__note">{item.note}</p>}
      {item.link?.href && (
        <p className="tl-card__link">
          <a href={item.link.href} target="_blank" rel="noreferrer">
            {item.link.label || 'En savoir plus'}
          </a>
        </p>
      )}
    </article>
  );
}

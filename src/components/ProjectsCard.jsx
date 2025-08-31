import React from 'react';
import '../styles/components/ProjectsCard.scss';

function makePlaceholder(text, w = 400, h = 200) {
  return `https://placehold.co/${w}x${h}?text=${encodeURIComponent(text || 'Projet')}`;
}

export default function ProjectCard({ project, onClick }) {
  const initialSrc =
    project?.coverImage && String(project.coverImage).trim()
      ? project.coverImage
      : makePlaceholder(project?.title);

  const handleError = (e) => {
    if (!e.target.dataset.fallback) {
      e.target.dataset.fallback = '1';
      e.target.src = '/placeholder-400x200.png';
    }
  };

  return (
    <article
      className="project-card"
      onClick={() => onClick?.(project)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={project?.title || 'Projet'}
    >
      <img
        src={initialSrc}
        alt={`Image du projet : ${project?.title || 'Projet'}`}
        loading="lazy"
        onError={handleError}
      />
      <div className="project-card__footer">
        <h3>{project?.title}</h3>
        {project?.tech && (
          <p className="tech">
            {Array.isArray(project.tech) ? project.tech.join(' • ') : project.tech}
          </p>
        )}
      </div>
    </article>
  );
}

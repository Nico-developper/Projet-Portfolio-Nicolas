// src/components/ProjectsCard.jsx
import PropTypes from 'prop-types';
import '../styles/components/ProjectsCard.scss';

export default function ProjectCard({ project, onClick }) {
  if (!project) return null;

  // coverImage peut déjà être un dataURL (data:image/...) ou un base64 simple
  const cover = project.coverImage?.startsWith?.('data:')
    ? project.coverImage
    : project.coverImage
      ? `data:image/jpeg;base64,${project.coverImage}`
      : null;

  const techText = Array.isArray(project.tech)
    ? project.tech.join(', ')
    : (project.tech || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .join(', ');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <article
      className="project-card"
      role="button"
      tabIndex={0}
      aria-label={`Voir le projet ${project.title || ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {cover ? (
        <img src={cover} alt={`Aperçu du projet ${project.title || ''}`} loading="lazy" />
      ) : (
        <div className="project-card__placeholder" aria-hidden="true">
          Aucune image
        </div>
      )}

      <div className="project-card__footer">
        <h3>{project.title}</h3>
        {techText && <p className="tech">{techText}</p>}
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    coverImage: PropTypes.string,
    tech: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  }),
  onClick: PropTypes.func,
};

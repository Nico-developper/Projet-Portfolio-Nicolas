// src/components/ProjectsCard.jsx
import PropTypes from 'prop-types';
import { makePublicSrc } from '@/utils/urls';
import '@/styles/components/ProjectsCard.scss';

export default function ProjectCard({ project, onClick }) {
  if (!project) return null;

  const cover = makePublicSrc(project.coverImage);

  const techText = Array.isArray(project.tech)
    ? project.tech.join(', ')
    : typeof project.tech === 'string'
      ? project.tech
      : '';

  return (
    <article
      className="project-card"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Ouvrir la fiche du projet ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <figure className="media">
        {cover && (
          <img
            src={cover}
            alt={`Couverture de ${project.title}`}
            loading="lazy"
            className="media__img"
          />
        )}
        {project.featured && <span className="badge">★</span>}
      </figure>

      <div className="content">
        <h3 className="title">{project.title}</h3>
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
    githubUrl: PropTypes.string,
    demoUrl: PropTypes.string,
    featured: PropTypes.bool,
  }),
  onClick: PropTypes.func,
};

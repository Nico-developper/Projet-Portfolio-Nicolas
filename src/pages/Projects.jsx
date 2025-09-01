import { useEffect, useState } from 'react';
import { fetchProjects } from '@/services/projectsService';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectsCard';
import ProjectModal from '../components/ProjectModal';
import AddProjectModal from '../components/AddProjectModal';
import { isAuthenticated } from '@/services/authService';
import '../styles/pages/Projects.scss';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProjects();
        setItems(data);
      } catch (e) {
        setError(e.message || 'Erreur');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSelect = (project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  const handlePrev = () => {
    if (!selectedProject) return;
    const idx = items.findIndex((p) => p.slug === selectedProject.slug);
    const prev = items[(idx - 1 + items.length) % items.length];
    setSelectedProject(prev);
  };

  const handleNext = () => {
    if (!selectedProject) return;
    const idx = items.findIndex((p) => p.slug === selectedProject.slug);
    const next = items[(idx + 1) % items.length];
    setSelectedProject(next);
  };

  const handleDeleteProject = (deletedSlug) => {
    setItems((prev) => prev.filter((p) => p.slug !== deletedSlug));
    setSelectedProject(null);
  };

  const handleUpdateProject = (updated) => {
    setItems((prev) =>
      prev.map((p) => (p._id === updated._id || p.slug === updated.slug ? updated : p)),
    );
    setSelectedProject(updated);
  };

  const handleAddClick = () => setShowAddModal(true);
  const handleAddProject = (newProject) => {
    if (newProject && newProject._id) {
      setItems((prev) => [...prev, newProject]);
      setShowAddModal(false);
    }
  };

  const breakpointColumnsObj = { default: 3, 1100: 2, 700: 1 };

  return (
    <section className="projects">
      <div className="container">
        <h2>Mes projets</h2>
        {loading && <p>Chargement des projets...</p>}
        {error && <p className="projects__error">Erreur : {error}</p>}

        {!loading && !error && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {items.map((project) => (
              <motion.div key={project._id} layout>
                <ProjectCard project={project} onClick={() => handleSelect(project)} />
              </motion.div>
            ))}

            {isAuthenticated() && (
              <motion.div layout>
                <div className="add-card" onClick={handleAddClick}>
                  <span>+</span>
                  <p>Ajouter un projet</p>
                </div>
              </motion.div>
            )}
          </Masonry>
        )}

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={handleCloseModal}
              onNext={handleNext}
              onPrev={handlePrev}
              onDelete={handleDeleteProject}
              onUpdate={handleUpdateProject}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddModal && (
            <AddProjectModal onClose={() => setShowAddModal(false)} onAdd={handleAddProject} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

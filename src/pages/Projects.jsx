import { useEffect, useMemo, useState } from 'react';
import { fetchProjects } from '@/services/projectsService';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectsCard';
import ProjectModal from '@/components/ProjectModal';
import AddProjectModal from '@/components/AddProjectModal';
import { isAuthenticated } from '@/services/authService';
import '@/styles/pages/Projects.scss';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sélection et add
  const [curIndex, setCurIndex] = useState(-1); // index dans items
  const [showAddModal, setShowAddModal] = useState(false);

  /** Chargement initial */
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProjects();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e?.message || 'Erreur');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /** Projet actuellement sélectionné (ou null) */
  const selectedProject = useMemo(
    () => (curIndex >= 0 && curIndex < items.length ? items[curIndex] : null),
    [curIndex, items],
  );

  /** Ouvrir / fermer */
  const handleSelect = (project) => {
    if (!project) return;
    const idx = items.findIndex((p) =>
      project._id ? p._id === project._id : p.slug && p.slug === project.slug,
    );
    setCurIndex(idx >= 0 ? idx : -1);
  };
  const handleCloseModal = () => setCurIndex(-1);

  /** Nav précédente / suivante */
  const handlePrev = () => {
    if (!items.length) return;
    setCurIndex((i) => (i <= 0 ? items.length - 1 : i - 1));
  };
  const handleNext = () => {
    if (!items.length) return;
    setCurIndex((i) => (i + 1) % items.length);
  };

  /** After DELETE/UPDATE/CREATE (adapter aux props des modales fournies) */
  const handleDeleted = (deletedId) => {
    setItems((prev) => prev.filter((p) => p._id !== deletedId));
    setCurIndex(-1);
  };
  const handleUpdated = (updated) => {
    setItems((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    // Rester ouvert sur le même index si possible
    const idx = items.findIndex((p) => p._id === updated._id);
    if (idx !== -1) setCurIndex(idx);
  };
  const handleCreated = (newProject) => {
    if (!newProject || !newProject._id) return;
    // On place le projet en tête pour le voir immédiatement
    setItems((prev) => [newProject, ...prev]);
    setShowAddModal(false);
    // Optionnel : l’ouvrir directement
    setCurIndex(0);
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
              <motion.div key={project._id || project.slug} layout>
                <ProjectCard project={project} onClick={() => handleSelect(project)} />
              </motion.div>
            ))}

            {isAuthenticated() && (
              <motion.div layout>
                <button
                  className="add-card"
                  onClick={() => setShowAddModal(true)}
                  onKeyDown={(e) => e.key === 'Enter' && setShowAddModal(true)}
                  aria-label="Ajouter un projet"
                >
                  <span aria-hidden>+</span>
                  <p>Ajouter un projet</p>
                </button>
              </motion.div>
            )}
          </Masonry>
        )}

        {/* Modale de lecture/édition/suppression */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              isOpen={!!selectedProject}
              project={selectedProject}
              index={curIndex}
              total={items.length}
              onClose={handleCloseModal}
              onPrev={handlePrev}
              onNext={handleNext}
              onDeleted={handleDeleted} // ← noms attendus par ma modale
              onUpdated={handleUpdated} // ← noms attendus par ma modale
            />
          )}
        </AnimatePresence>

        {/* Modale d’ajout */}
        <AnimatePresence>
          {showAddModal && (
            <AddProjectModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onCreated={handleCreated} // ← nom attendu par ma modale
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

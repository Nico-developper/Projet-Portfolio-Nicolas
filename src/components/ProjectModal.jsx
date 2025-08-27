// => Version complète avec navigation/édition/suppression (cohérente avec Projects.jsx)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { isAuthenticated, getToken } from "@/services/authService";
import "../styles/components/ProjectModal.scss";

export default function ProjectModal({
    project,
    onClose,
    onPrev,
    onNext,
    onDelete,
}) {
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech: "",
        githubUrl: "",
        demoUrl: "",
        imageFile: null,
    });

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || "",
                description: project.description || "",
                tech: Array.isArray(project.tech)
                    ? project.tech.join(", ")
                    : project.tech || "",
                githubUrl: project.githubUrl || "",
                demoUrl: project.demoUrl || "",
                imageFile: null,
            });
            setPreviewImage(project.coverImage || null);
            setMessage("");
            setEditMode(false);
        }
    }, [project]);

    if (!project) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!/\.jpe?g$/i.test(file.name))
            return setMessage("Image invalide : uniquement .jpg / .jpeg");
        if (file.size > 20 * 1024 * 1024)
            return setMessage("Image trop lourde (max 20 Mo).");
        setFormData((p) => ({ ...p, imageFile: file }));
        setPreviewImage(URL.createObjectURL(file));
        setMessage("");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            const form = new FormData();
            form.append("title", formData.title);
            form.append("description", formData.description);
            form.append("tech", formData.tech);
            form.append("githubUrl", formData.githubUrl);
            form.append("demoUrl", formData.demoUrl);
            if (formData.imageFile) form.append("image", formData.imageFile);

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/projects/${project.slug}`,
                {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${token}` },
                    body: form,
                }
            );
            if (!res.ok) throw new Error("Erreur lors de la mise à jour");
            setMessage("Projet mis à jour ✅");
            setEditMode(false);
        } catch (err) {
            setMessage(err.message || "Erreur mise à jour");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Supprimer ce projet ?")) return;
        try {
            const token = getToken();
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/projects/${project.slug}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!res.ok) throw new Error("Suppression impossible");
            onDelete?.(project.slug);
        } catch (err) {
            setMessage(err.message || "Erreur suppression");
        }
    };

    return (
        <motion.div
            className='modal-backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className='modal-content'
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className='close-btn'
                    onClick={onClose}
                    aria-label='Fermer'
                >
                    <X />
                </button>

                {editMode ? (
                    <form onSubmit={handleUpdate} className='edit-form'>
                        <input
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Titre'
                            required
                        />
                        <textarea
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Description'
                            rows={4}
                            required
                        />
                        <input
                            name='tech'
                            value={formData.tech}
                            onChange={handleChange}
                            placeholder='Technologies (séparées par des virgules)'
                        />
                        <input
                            name='githubUrl'
                            type='url'
                            value={formData.githubUrl}
                            onChange={handleChange}
                            placeholder='Lien GitHub'
                        />
                        <input
                            name='demoUrl'
                            type='url'
                            value={formData.demoUrl}
                            onChange={handleChange}
                            placeholder='Lien Démo'
                        />
                        <input
                            type='file'
                            accept='.jpg,.jpeg'
                            onChange={handleFile}
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt='Aperçu'
                                className='modal-cover'
                            />
                        )}
                        {message && <p className='message'>{message}</p>}
                        <div className='actions'>
                            <button type='submit'>Enregistrer</button>
                            <button
                                type='button'
                                onClick={() => setEditMode(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h3>{project.title}</h3>
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt={`Aperçu du projet ${project.title}`}
                                className='modal-cover'
                            />
                        )}
                        <p>{project.description}</p>
                        {(project.githubUrl || project.demoUrl) && (
                            <div className='modal-links'>
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        GitHub
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        Démo
                                    </a>
                                )}
                            </div>
                        )}
                        {isAuthenticated() && (
                            <div className='admin-actions'>
                                <button
                                    className='edit-btn'
                                    onClick={() => setEditMode(true)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className='delete-btn'
                                    onClick={handleDelete}
                                >
                                    Supprimer
                                </button>
                            </div>
                        )}
                    </>
                )}

                <div className='nav-buttons'>
                    <button onClick={onPrev} aria-label='Projet précédent'>
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={onNext} aria-label='Projet suivant'>
                        <ChevronRight size={24} />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

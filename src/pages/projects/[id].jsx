import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/projectdetail.module.css";

export default function ProjectDetail() {
    const [project, setProject] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;

        fetch("/projects.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((projects) => {
                const selectedProject = projects.find(
                    (project) => String(project.id) === id
                );
                setProject(selectedProject);
            })
            .catch((error) => {
                console.error("Error while loading the project data:", error);
            });
    }, [id]);

    if (!project) {
        return <p>Projekt-Daten werden geladen...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>{project.title}</h1>
                <div className={styles.coverImageContainer}>
                    <img
                        src={project.mainImage}
                        alt={project.title}
                        className={styles.coverImage}
                    />
                </div>
                {project.longDescription && (
                    <p className={styles.description}>{project.longDescription}</p>
                )}
                {project.gallery && project.gallery.length > 0 && (
                    <div className={styles.gallery}>
                        {project.gallery.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Project Image ${index + 1}`}
                                className={styles.galleryImage}
                            />
                        ))}
                    </div>
                )}
                {project.client || project.date || project.category ? (
                    <div className={styles.projectDetails}>
                        <ul>
                            {project.client && (
                                <li>
                                    <strong>client:</strong> {project.client}
                                </li>
                            )}
                            {project.date && (
                                <li>
                                    <strong>date:</strong> {project.date}
                                </li>
                            )}
                            {project.category && (
                                <li>
                                    <strong>category:</strong> {project.category}
                                </li>
                            )}
                        </ul>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
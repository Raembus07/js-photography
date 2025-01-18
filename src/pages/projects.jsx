import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/project.module.css";

export default function ProjectsOverview() {
    const [projects, setProjects] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch("/projects.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setProjects(data))
            .catch((error) =>
                console.error("Fehler beim Laden der JSON-Daten:", error)
            );
    }, []);

    const handleProjectClick = (projectId) => {
        router.push(`/projects/${projectId}`);
    };

    return (
        <div className={styles.container}>
            {projects.length === 0 ? (
                <p>Lade Projekte...</p>
            ) : (
                <div className={styles.grid}>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={styles.card}
                            onClick={() => handleProjectClick(project.id)}
                        >
                            <img
                                src={project.mainImage}
                                alt={project.title}
                                className={styles.image}
                            />
                            <h2>{project.title}</h2>
                            <p>{project.shortDescription}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
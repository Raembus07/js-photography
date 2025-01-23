import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/styles/project.module.css";

export default function ProjectsOverview() {
    const [projects, setProjects] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/projects.json");
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error loading project data:", error);
            }
        };

        fetchProjects().then(r => console.log('fetching successfully'));
    }, []);

    const handleProjectClick = (projectId) => {
        router.push(`/projects/${projectId}`).then(r => console.log('pushed to /projects successfully'));
    };

    return (
        <div className={styles.container}>
            {projects.length === 0 ? (
                <p>Loading projects...</p>
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
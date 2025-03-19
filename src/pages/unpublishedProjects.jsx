import React, {useEffect, useState} from "react";
    import {useRouter} from "next/router";
    import styles from "@/styles/unpublishedProjects.module.css";
    import Footer from "@/components/Footer";

    export default function UnpublishedProjects() {
        const [projects, setProjects] = useState([]);
        const router = useRouter();

        useEffect(() => {
            const fetchProjects = async () => {
                try {
                    const response = await fetch("/unpublishedProjects.json");
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
            router.push(`/unpublishedProjects/${projectId}`).then(r => console.log('pushed to /unpublishedProjects successfully'));
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
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className={styles.image}
                                />
                                <h2>{project.title}</h2>
                                <p>{project.shortDescription}</p>
                            </div>
                        ))}
                    </div>
                )}
                <Footer/>
            </div>
        );
    }
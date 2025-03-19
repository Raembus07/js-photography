import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/styles/projectdetail.module.css";

export default function UnpublishedProjectDetail() {
    const [project, setProject] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;

            try {
                const response = await fetch("/unpublishedProjects.json");
                if (!response.ok) {
                    console.log("HTTP status", response.status);
                    throw new Error(`HTTP status ${response.status}`);
                }
                const projects = await response.json();
                const selectedProject = projects.find(
                    (project) => String(project.id) === id
                );
                setProject(selectedProject);
            } catch (error) {
                console.error("Error while loading the project data:", error);
            }
        };

        fetchProject().then(r => console.log('fetching successfully'));
    }, [id]);

    if (!project) {
        return <p>Loading project data...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>{project.title}</h1>

                <div className={styles.coverVideoContainer}>
                    <video
                        src={project.mainImage}
                        alt={project.title}
                        className={styles.coverVideo}
                        controls
                    />
                </div>

                {project.longDescription && (
                    <p className={styles.description}>{project.longDescription}</p>
                )}

                {project.gallery?.length > 0 && (
                    <div className={styles.gallery}>
                        {project.gallery.map((video, index) => (
                            <video
                                key={index}
                                src={video}
                                alt={`Project Video ${index + 1}`}
                                className={styles.galleryVideo}
                                controls
                            />
                        ))}
                    </div>
                )}

                {(project.client || project.date || project.category) && (
                    <div className={styles.projectDetails}>
                        <ul>
                            {project.client && (
                                <li>
                                    <strong>Client:</strong> {project.client}
                                </li>
                            )}
                            {project.date && (
                                <li>
                                    <strong>Date:</strong> {project.date}
                                </li>
                            )}
                            {project.category && (
                                <li>
                                    <strong>Category:</strong> {project.category}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
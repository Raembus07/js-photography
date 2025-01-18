import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/styles/projectdetail.module.css";

export default function ProjectDetail() {
    const [project, setProject] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }

        fetch("/projects.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((projects) => {
                const selectedProject = projects.find(
                    (project) => project.id === parseInt(id, 10)
                );
                setProject(selectedProject);
            })
            .catch((error) =>
                console.error("error while loading the project data:", error)
            );
    }, [id]);

    if (!project) {
        return <p>Projekt-Daten werden geladen...</p>;
    }

    return (
        <div className={styles.container}>
            <h1>{project.title}</h1>
            <img
                src={project.mainImage}
                alt={project.title}
                className={styles.image}
            />
            <p className={styles.description}>{project.longDescription}</p>
            <div className={styles.gallery}>
                {project.gallery.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Bild ${index + 1}`}
                        className={styles.galleryImage}
                    />
                ))}
            </div>
            <button onClick={() => router.back()} className={styles.button}>
                back
            </button>
        </div>
    );
}
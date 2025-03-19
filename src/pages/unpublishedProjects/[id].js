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
                    throw new Error(`HTTP status ${response.status}`);
                }
                const projects = await response.json();
                const selectedProject = projects.find(
                    (project) => String(project.id) === id
                );

                // Convert YouTube URLs to embed format
                if (selectedProject && selectedProject.mainImage) {
                    // Handle YouTube Shorts
                    if (selectedProject.mainImage.includes('youtube.com/shorts/')) {
                        const videoId = selectedProject.mainImage.split('youtube.com/shorts/')[1].split('?')[0];
                        selectedProject.mainImage = `https://www.youtube.com/embed/${videoId}`;
                    }
                    // Convert youtu.be links
                    else if (selectedProject.mainImage.includes('youtu.be/')) {
                        const videoId = selectedProject.mainImage.split('youtu.be/')[1].split('?')[0];
                        selectedProject.mainImage = `https://www.youtube.com/embed/${videoId}`;
                    }
                    // Convert youtube.com/watch links
                    else if (selectedProject.mainImage.includes('youtube.com/watch')) {
                        const url = new URL(selectedProject.mainImage);
                        const videoId = url.searchParams.get('v');
                        if (videoId) {
                            selectedProject.mainImage = `https://www.youtube.com/embed/${videoId}`;
                        }
                    }
                    // Fix existing embed links if needed
                    else if (selectedProject.mainImage.includes('youtube.com/embed') ||
                        selectedProject.mainImage.includes('shorts/embed')) {
                        // Ensure proper protocol
                        if (!selectedProject.mainImage.startsWith('https://')) {
                            selectedProject.mainImage = `https://${selectedProject.mainImage.split('://')[1] || selectedProject.mainImage}`;
                        }
                    }
                }

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
                    {project.mainImage.includes('youtube.com/embed') ? (
                        <iframe
                            className={styles.coverVideo}
                            src={project.mainImage.includes('youtube.com') ?
                                project.mainImage.replace('https://www.youtube.com', 'https://www.youtube-nocookie.com') :
                                project.mainImage}
                            title={project.title}
                            frameBorder="0"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <video
                            className={styles.coverVideo}
                            controls
                            preload="metadata"
                        >
                            <source src={project.mainImage} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    )}
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
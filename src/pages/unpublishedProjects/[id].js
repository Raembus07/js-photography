import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/styles/projectdetail.module.css";
import {motion} from "framer-motion";

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
        return (
            <motion.div
                className={styles.loadingContainer}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
            >
                <p>Loading project data...</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            className={styles.container}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.6}}
        >
            <motion.div
                className={styles.content}
                initial={{y: 20}}
                animate={{y: 0}}
                transition={{duration: 0.5, delay: 0.2}}
            >
                <motion.h1
                    className={styles.title}
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.3}}
                >
                    {project.title}
                </motion.h1>

                <motion.div
                    className={styles.coverVideoContainer}
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{
                        duration: 0.7,
                        delay: 0.4,
                        type: "spring",
                        stiffness: 100
                    }}
                >
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
                </motion.div>

                {project.longDescription && (
                    <motion.p
                        className={styles.description}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.6}}
                    >
                        {project.longDescription}
                    </motion.p>
                )}

                {project.gallery?.length > 0 && (
                    <motion.div
                        className={styles.gallery}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.7, delay: 0.7}}
                    >
                        {project.gallery.map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 30}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 0.8 + index * 0.1}}
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                <video
                                    src={video}
                                    alt={`Project Video ${index + 1}`}
                                    className={styles.galleryVideo}
                                    controls
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {(project.client || project.date || project.category) && (
                    <motion.div
                        className={styles.projectDetails}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.9}}
                    >
                        <ul>
                            {project.client && (
                                <motion.li
                                    initial={{opacity: 0, x: -10}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{duration: 0.4, delay: 1.0}}
                                >
                                    <strong>Client:</strong> {project.client}
                                </motion.li>
                            )}
                            {project.date && (
                                <motion.li
                                    initial={{opacity: 0, x: -10}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{duration: 0.4, delay: 1.1}}
                                >
                                    <strong>Date:</strong> {project.date}
                                </motion.li>
                            )}
                            {project.category && (
                                <motion.li
                                    initial={{opacity: 0, x: -10}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{duration: 0.4, delay: 1.2}}
                                >
                                    <strong>Category:</strong> {project.category}
                                </motion.li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
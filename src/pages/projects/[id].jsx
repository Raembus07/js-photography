import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/styles/projectdetail.module.css";
import {motion} from "framer-motion";
import Footer from "@/components/Footer";

export default function ProjectDetail() {
    const [project, setProject] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;

            try {
                const response = await fetch("/projects.json");
                if (!response.ok) {
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
        return (
            <motion.div
                className={styles.container}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.6}}
            >
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.3}}
                >
                    Loading project data...
                </motion.p>
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
            <motion.div className={styles.content}>
                <motion.h1
                    className={styles.title}
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    {project.title}
                </motion.h1>

                <motion.div
                    className={styles.coverImageContainer}
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{delay: 0.2, duration: 0.5}}
                >
                    <img
                        src={project.mainImage}
                        alt={project.title}
                        className={styles.coverImage}
                    />
                </motion.div>

                {project.longDescription && (
                    <motion.p
                        className={styles.description}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4, duration: 0.5}}
                    >
                        {project.longDescription}
                    </motion.p>
                )}

                {project.gallery?.length > 0 && (
                    <motion.div
                        className={styles.gallery}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5, duration: 0.5}}
                    >
                        {project.gallery.map((image, index) => (
                            <motion.img
                                key={index}
                                src={image}
                                alt={`Project Image ${index + 1}`}
                                className={styles.galleryImage}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.6 + (index * 0.1), duration: 0.4}}
                                whileHover={{scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.15)"}}
                            />
                        ))}
                    </motion.div>
                )}

                {(project.client || project.date || project.category) && (
                    <motion.div
                        className={styles.projectDetails}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.7, duration: 0.5}}
                    >
                        <ul>
                            {project.client && (
                                <motion.li
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.8, duration: 0.3}}
                                >
                                    <strong>Client:</strong> {project.client}
                                </motion.li>
                            )}
                            {project.date && (
                                <motion.li
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.9, duration: 0.3}}
                                >
                                    <strong>Date:</strong> {project.date}
                                </motion.li>
                            )}
                            {project.category && (
                                <motion.li
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 1.0, duration: 0.3}}
                                >
                                    <strong>Category:</strong> {project.category}
                                </motion.li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </motion.div>
            <Footer/>
        </motion.div>
    );
}
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/styles/unpublishedProjects.module.css";
import Footer from "@/components/Footer";
import {motion} from "framer-motion";

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
        <motion.div
            className={styles.container}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.6}}
        >
            {projects.length === 0 ? (
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                >
                    Loading projects...
                </motion.p>
            ) : (
                <motion.div
                    className={styles.grid}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={styles.card}
                            onClick={() => handleProjectClick(project.id)}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.5,
                                delay: 0.3 + index * 0.1
                            }}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
                            }}
                            whileTap={{scale: 0.98}}
                        >
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className={styles.image}
                            />
                            <h2>{project.title}</h2>
                            <p>{project.shortDescription}</p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
            <Footer/>
        </motion.div>
    );
}
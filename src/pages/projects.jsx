import React, {useEffect, useState, useRef} from "react";
import {useRouter} from "next/router";
import styles from "@/styles/project.module.css";
import Footer from "@/components/Footer";
import {motion} from "framer-motion";

export default function ProjectsOverview() {
    const [projects, setProjects] = useState([]);
    const router = useRouter();
    const containerRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState({});

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

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Extract the project ID from the target element's dataset
                    const projectId = entry.target.dataset.projectId;
                    setVisibleItems(prev => ({
                        ...prev,
                        [projectId]: true
                    }));
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '100px 0px 0px 0px'
        });

        // Get all project cards and observe them
        const projectCards = document.querySelectorAll(`.${styles.card}`);
        projectCards.forEach(card => {
            observer.observe(card);
        });

        return () => {
            projectCards.forEach(card => {
                observer.unobserve(card);
            });
        };
    }, [projects]); // Re-run when projects change

    const handleProjectClick = (projectId) => {
        router.push(`/projects/${projectId}`).then(r => console.log('pushed to /projects successfully'));
    };

    return (
        <motion.div
            className={styles.container}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.6}}
            ref={containerRef}
        >
            {projects.length === 0 ? (
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.3}}
                >
                    Loading projects...
                </motion.p>
            ) : (
                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={styles.card}
                            data-project-id={project.id}
                            onClick={() => handleProjectClick(project.id)}
                            initial={{opacity: 0, y: 30}}
                            animate={visibleItems[project.id] ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                            transition={{
                                duration: 0.5,
                                delay: 0.1,
                                ease: "easeOut"
                            }}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
                            }}
                        >
                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={visibleItems[project.id] ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.95}}
                                transition={{delay: 0.2, duration: 0.4}}
                            >
                                <img
                                    src={project.mainImage}
                                    alt={project.title}
                                    className={styles.image}
                                />
                            </motion.div>
                            <motion.h2
                                initial={{opacity: 0}}
                                animate={visibleItems[project.id] ? {opacity: 1} : {opacity: 0}}
                                transition={{delay: 0.3, duration: 0.4}}
                            >
                                {project.title}
                            </motion.h2>
                            <motion.p
                                initial={{opacity: 0}}
                                animate={visibleItems[project.id] ? {opacity: 1} : {opacity: 0}}
                                transition={{delay: 0.4, duration: 0.4}}
                            >
                                {project.shortDescription}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            )}
            <Footer/>
        </motion.div>
    );
}
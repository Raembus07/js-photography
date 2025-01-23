import React, { useEffect, useState } from "react";
import styles from "@/styles/about.module.css";
import Link from "next/link";

const AboutPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch("/about.json");
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error loading about data:", error);
            }
        };

        fetchAboutData().then(r => console.log('fetching successfully'));
    }, []);

    if (!data) {
        return <p>Loading...</p>;
    }

    const { about, passion, contact } = data;

    return (
        <main className={styles.aboutContainer}>
            <section className={styles.aboutSection}>
                <div className={styles.aboutText}>
                    <h1 className={styles.title}>{about.title}</h1>
                    {about.description.map((paragraph, index) => (
                        <p key={index} className={styles.description}>
                            {paragraph.includes("Josia Schweizer") ? (
                                <>
                                    {paragraph.split("Josia Schweizer")[0]}
                                    <Link href="/contact" className={styles.contactLink}>
                                        Josia Schweizer
                                    </Link>
                                    {paragraph.split("Josia Schweizer")[1]}
                                </>
                            ) : (
                                paragraph
                            )}
                        </p>
                    ))}
                </div>
                <div className={styles.aboutImage}>
                    <img
                        src={about.image}
                        alt="About Me"
                        className={styles.image}
                    />
                </div>
            </section>

            <section className={styles.passionSection}>
                <div className={styles.passionContent}>
                    <h2 className={styles.title}>{passion.title}</h2>
                    {passion.description.map((paragraph, index) => (
                        <p key={index} className={styles.description}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            <section className={styles.contactSection}>
                <h2 className={styles.title}>{contact.title}</h2>
                <p className={styles.description}>{contact.description}</p>
            </section>
        </main>
    );
};

export default AboutPage;
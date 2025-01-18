import React from "react";
import styles from "@/styles/about.module.css";
import Link from "next/link";

const AboutPage = () => {
    return (
        <main className={styles.aboutContainer}>
            <section className={styles.aboutSection}>
                <div className={styles.aboutText}>
                    <h1 className={styles.title}>about me</h1>
                    <p className={styles.description}>
                        hello, i am <Link href="/contact" className={styles.contactLink}>josia schweizer</Link>, a dedicated and passionate creator who loves blending art and technology to bring stories to life.
                        as a photographer and videographer, i thrive on capturing the essence of fleeting moments and turning them into timeless visuals. whether it's the serene landscapes of nature, the vibrance of urban life, or the heartfelt emotions of personal connections, my goal is to tell meaningful stories through my work.
                    </p>
                    <p className={styles.description}>
                        when i'm not behind the lens or immersed in creative projects, you can usually find me exploring the outdoors, seeking fresh inspiration, or diving into the latest trends in technology and art. every day is an opportunity to dream, create, and connect with people who share the same passion for storytelling and visual art.
                    </p>
                </div>
                <div className={styles.aboutImage}>
                    <img src="/images/aboutme-photo1.jpg" alt="About me" className={styles.image} />
                </div>
            </section>

            <section className={styles.passionSection}>
                <div className={styles.passionContent}>
                    <h2 className={styles.title}>my passion</h2>
                    <p className={styles.description}>
                        my passion lies in the boundless world of creativity. whether it's through photography, videography, or design, i am driven by a desire to create visuals that not only capture moments but also evoke emotions and tell compelling stories. bringing ideas to life is what excites me the most — turning concepts into visuals that stand out and resonate with audiences.
                    </p>
                    <p className={styles.description}>
                        beyond the art itself, i enjoy experimenting with new techniques, exploring cutting-edge tools, and continually evolving. every new project is a challenge, and those challenges fuel my growth as an artist. creativity allows me to build connections, spark ideas, and inspire others to see the beauty in the everyday.
                    </p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <h2 className={styles.title}>contact me</h2>
                <p className={styles.description}>
                    let's work together to create something unforgettable. whether you have a specific project in mind, need creative input, or just want to collaborate, i'm always open to discussing new ideas and opportunities. feel free to reach out to me!
                </p>
            </section>
        </main>
    );
};

export default AboutPage;
// pages/index.js
import Head from "next/head";
import styles from "@/styles/index.module.css";

export default function Home() {
    return (
        <>
            <Head>
                <title>welcome | my portfolio</title>
                <meta name="description" content="be inspired. welcome to my portfolio!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className={styles.entryContainer}>
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>
                    welcome, i am <span className={styles.highlight}>josia schweizer</span>
                </h1>
                <p className={styles.subtitle}>
                    creator of <strong>unique works</strong>, photographer & videographer by passion.
                </p>
            </main>

            <section className={styles.gallery}>
                <h2 className={styles.sectionTitle}>portfolio</h2>

                <div className={styles.grid}>
                    <div className={styles.gridItem}>
                        <img src="/images/index-photo1.jpg" alt="image 1" className={styles.photo} />
                    </div>
                    <div className={styles.gridItem}>
                        <img src="/images/index-photo2.jpg" alt="image 2" className={styles.photo} />
                    </div>
                </div>
            </section>
        </>
    );
}
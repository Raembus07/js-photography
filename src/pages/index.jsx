// pages/index.js
import Head from "next/head";
import styles from "@/styles/index.module.css";

export default function Home() {
    return (
        <>
            <Head>
                <title>Welcome | My Portfolio</title>
                <meta
                    name="description"
                    content="Be inspired. Welcome to my portfolio!"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className={styles.entryContainer}>
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>
                    Welcome, I am <span className={styles.highlight}>Josia Schweizer</span>
                </h1>
                <p className={styles.subtitle}>
                    Creator of <strong>unique works</strong>, photographer & videographer
                    by passion.
                </p>
            </main>

            <section className={styles.gallery}>
                <h2 className={styles.sectionTitle}>Portfolio</h2>

                <div className={styles.grid}>
                    <div className={styles.gridItem}>
                        <img
                            src="/images/index-photo1.jpg"
                            alt="Image 1"
                            className={styles.photo}
                        />
                    </div>
                    <div className={styles.gridItem}>
                        <img
                            src="/images/index-photo2.jpg"
                            alt="Image 2"
                            className={styles.photo}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
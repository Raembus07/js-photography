// pages/index.js
import Head from "next/head";
import styles from "@/styles/index.module.css";

export default function Home() {
    return (
        <>
            {/* Meta-Daten für die Seite */}
            <Head>
                <title>Willkommen | Mein Portfolio</title>
                <meta name="description" content="Lass dich inspirieren. Willkommen auf meinem Portfolio!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Hauptbereich */}
            <main className={styles.entryContainer}>
                {/* Animierter Overlay-Hintergrund */}
                <div className={styles.overlay}></div>

                {/* Hauptinhalt */}
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Willkommen, ich bin <span className={styles.highlight}>Josia Schweizer</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Schöpfer <strong>einzigartiger Ideen</strong>, Entwickler mit Leidenschaft und Designer mit Stil.
                    </p>
                    <div className={styles.buttonContainer}>
                        <a href="/about" className={`${styles.button} ${styles.primaryButton}`}>
                            Über mich
                        </a>
                        <a href="/projects" className={`${styles.button} ${styles.secondaryButton}`}>
                            Meine Projekte
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}
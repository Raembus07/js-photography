import React from "react";
import {FormattedMessage} from "react-intl";
import styles from "@/styles/about.module.css";
import Link from "next/link";
import LogoLink from "@/components/LogoLink";

const AboutPage = () => {
    return (
        <main className={styles.aboutContainer}>
            <section className={styles.aboutSection}>
                <div className={styles.aboutText}>
                    <h1 className={styles.title}>
                        <FormattedMessage id="aboutTitle"/>
                    </h1>
                    <p className={styles.description}>
                        <FormattedMessage id="aboutDescription1"/>
                    </p>
                    <p className={styles.description}>
                        <FormattedMessage id="aboutDescription2"/>
                    </p>
                </div>
                <div className={styles.aboutImage}>
                    <img
                        src="/images/aboutme-photo1.jpg"
                        alt="About Me"
                        className={styles.image}
                    />
                </div>
            </section>

            <section className={styles.passionSection}>
                <div className={styles.passionContent}>
                    <h2 className={styles.title}>
                        <FormattedMessage id="passionTitle"/>
                    </h2>
                    <p className={styles.description}>
                        <FormattedMessage id="passionDescription1"/>
                    </p>
                    <p className={styles.description}>
                        <FormattedMessage id="passionDescription2"/>
                    </p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <h2 className={styles.title}>
                    <FormattedMessage id="contactTitle"/>
                </h2>
                <p className={styles.description}>
                    <FormattedMessage id="contactDescription"/>
                </p>
            </section>

            <section className={styles.socialMediaSection}>
                <h2 className={styles.title}>
                    <FormattedMessage id="socialMediaTitle"/>
                </h2>
                <p className={styles.description}>
                    <FormattedMessage id="socialMediaDescription"/>
                </p>
                <LogoLink
                    href="https://www.instagram.com/js_photography_ch"
                    imgSrc="/images/instagram-logo.png"
                    altText="Instagram"
                />
                <LogoLink
                    href="https://www.linkedin.com/in/yourusername"
                    imgSrc="/images/linkedin-logo.png"
                    altText="LinkedIn"
                />
            </section>
        </main>
    );
};

export default AboutPage;
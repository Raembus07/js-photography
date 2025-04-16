import React from "react";
import {FormattedMessage} from "react-intl";
import styles from "@/styles/about.module.css";
import LogoLink from "@/components/LogoLink";
import {motion, useInView} from "framer-motion";
import {useRef} from "react";

const AboutPage = () => {
    const aboutRef = useRef(null);
    const passionRef = useRef(null);
    const contactRef = useRef(null);
    const socialRef = useRef(null);

    const aboutInView = useInView(aboutRef, {once: true, amount: 0.3});
    const passionInView = useInView(passionRef, {once: true, amount: 0.3});
    const contactInView = useInView(contactRef, {once: true, amount: 0.3});
    const socialInView = useInView(socialRef, {once: true, amount: 0.3});

    return (
        <main className={styles.aboutContainer}>
            <motion.section
                className={styles.aboutSection}
                ref={aboutRef}
                initial={{opacity: 0}}
                animate={aboutInView ? {opacity: 1} : {opacity: 0}}
                transition={{duration: 0.8}}
            >
                <motion.div
                    className={styles.aboutText}
                    initial={{x: -50}}
                    animate={aboutInView ? {x: 0} : {x: -50}}
                    transition={{delay: 0.2, duration: 0.6}}
                >
                    <h1 className={styles.title}>
                        <FormattedMessage id="aboutTitle"/>
                    </h1>
                    <p className={styles.description}>
                        <FormattedMessage id="aboutDescription1"/>
                    </p>
                    <p className={styles.description}>
                        <FormattedMessage id="aboutDescription2"/>
                    </p>
                </motion.div>
                <motion.div
                    className={styles.aboutImage}
                    initial={{x: 50}}
                    animate={aboutInView ? {x: 0} : {x: 50}}
                    transition={{delay: 0.4, duration: 0.6}}
                >
                    <img
                        src="/images/aboutme-photo1.jpg"
                        alt="About Me"
                        className={styles.image}
                    />
                </motion.div>
            </motion.section>

            <motion.section
                className={styles.passionSection}
                ref={passionRef}
                initial={{opacity: 0, y: 30}}
                animate={passionInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                transition={{duration: 0.7}}
            >
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
            </motion.section>

            <motion.section
                className={styles.contactSection}
                ref={contactRef}
                initial={{opacity: 0, y: 30}}
                animate={contactInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                transition={{duration: 0.7}}
            >
                <motion.a
                    href='/contact'
                    whileHover={{scale: 1.03}}
                    transition={{type: "spring", stiffness: 400, damping: 10}}
                >
                    <h2 className={styles.contactTitle}>
                        <FormattedMessage id="contactTitle"/>
                    </h2>
                </motion.a>
                <p className={styles.description}>
                    <FormattedMessage id="contactDescription"/>
                </p>
            </motion.section>

            <motion.section
                className={styles.socialMediaSection}
                ref={socialRef}
                initial={{opacity: 0, y: 30}}
                animate={socialInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                transition={{duration: 0.7}}
            >
                <h2 className={styles.title}>
                    <FormattedMessage id="socialMediaTitle"/>
                </h2>
                <p className={styles.description}>
                    <FormattedMessage id="socialMediaDescription"/>
                </p>
                <div className={styles.logoContainer}>
                    <motion.div whileHover={{y: -5}} transition={{type: "spring", stiffness: 400}}>
                        <LogoLink
                            href="https://www.instagram.com/js_photography_ch"
                            imgSrc="/images/instagram-logo.png"
                            altText="Instagram"
                        />
                    </motion.div>
                    <motion.div whileHover={{y: -5}} transition={{type: "spring", stiffness: 400}}>
                        <LogoLink
                            href="https://www.linkedin.com/in/josia-schweizer-273a21294/"
                            imgSrc="/images/linkedin-logo.png"
                            altText="LinkedIn"
                        />
                    </motion.div>
                </div>
            </motion.section>
        </main>
    );
};

export default AboutPage;
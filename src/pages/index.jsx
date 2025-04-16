import Head from "next/head";
import {getIntl, RawIntlProvider} from "@/i18n";
import styles from "@/styles/index.module.css";
import {motion, useInView} from "framer-motion";
import {useRef} from "react";

export default function Home({locale}) {
    const intl = getIntl(locale);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {once: true, amount: 0.3});

    const imageRefs = [useRef(null), useRef(null), useRef(null)];
    const imagesInView = imageRefs.map(ref =>
        useInView(ref, {once: true, amount: 0.3})
    );

    return (
        <RawIntlProvider value={intl}>
            <Head>
                <title>{intl.formatMessage({id: 'title'})}</title>
                <meta
                    name="description"
                    content={intl.formatMessage({id: 'description'})}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>

            <main className={styles.entryContainer}>
                <div className={styles.overlay}></div>
                <motion.h1
                    className={styles.title}
                    initial={{opacity: 0, y: -50, rotate: -10}}
                    animate={{opacity: 1, y: 0, rotate: 0}}
                    transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 15,
                        mass: 3,
                        delay: 0.2
                    }}
                >
                    {intl.formatMessage({id: 'welcome'})}
                </motion.h1>
                <motion.p
                    className={styles.subtitle}
                    initial={{opacity: 0, y: -50, rotate: 8}}
                    animate={{opacity: 1, y: 0, rotate: 0}}
                    transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 15,
                        mass: 3,
                        delay: 0.8
                    }}
                >
                    {intl.formatMessage({id: 'subtitle'}, {
                        b: (chunks) => <b style={{fontWeight: 'bold'}}>{chunks}</b>,
                    })}
                </motion.p>
            </main>

            <section className={styles.gallery} ref={sectionRef}>
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={isInView ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.5}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                >
                    {intl.formatMessage({id: 'portfolio'})}
                </motion.h2>

                <div className={styles.grid}>
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className={styles.gridItem}
                            ref={imageRefs[index]}
                            initial={{opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50}}
                            animate={imagesInView[index]
                                ? {opacity: 1, x: 0, y: 0}
                                : {opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50}}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.2,
                                ease: "easeOut"
                            }}
                        >
                            <img
                                src={`/images/index-photo${index + 1}.jpg`}
                                alt={intl.formatMessage({id: `image${index + 1}Alt`})}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>
        </RawIntlProvider>
    );
}

Home.getInitialProps = async ({locale}) => {
    return {locale};
};
import Head from "next/head";
import {getIntl, RawIntlProvider} from "@/i18n";
import styles from "@/styles/index.module.css";

export default function Home({locale}) {
    const intl = getIntl(locale);

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
                <h1 className={styles.title}>
                    {intl.formatMessage({id: 'welcome'})}
                </h1>
                <p className={styles.subtitle}>
                    {intl.formatMessage({id: 'subtitle'}, {
                        b: (chunks) => <b style={{ fontWeight: 'bold' }}>{chunks}</b>,
                    })}
                </p>
            </main>

            <section className={styles.gallery}>
                <h2 className={styles.sectionTitle}>{intl.formatMessage({id: 'portfolio'})}</h2>

                <div className={styles.grid}>
                    <div className={styles.gridItem}>
                        <img
                            src="/images/index-photo1.jpg"
                            alt={intl.formatMessage({id: 'image1Alt'})}
                            className={styles.photo}
                        />
                    </div>
                    <div className={styles.gridItem}>
                        <img
                            src="/images/index-photo2.jpg"
                            alt={intl.formatMessage({id: 'image2Alt'})}
                            className={styles.photo}
                        />
                    </div>
                    <div className={styles.gridItem}>
                        <img
                            src="/images/index-photo3.jpg"
                            alt={intl.formatMessage({id: 'image3Alt'})}
                            className={styles.photo}
                        />
                    </div>
                </div>
            </section>
        </RawIntlProvider>
    );
}

Home.getInitialProps = async ({locale}) => {
    return {locale};
};
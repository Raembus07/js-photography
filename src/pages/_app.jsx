import React from "react";
import Header from "@/components/Header";
import "@/styles/global.css";
import {motion} from "framer-motion";
import {IntlProvider} from "react-intl";
import enMessages from "@/locales/en.json";
import deMessages from "@/locales/de.json";
import frMessages from "@/locales/fr-CH.json";
import {Analytics} from "@vercel/analytics/react"

const messages = {
    en: enMessages,
    de: deMessages,
    fr: frMessages,
};

export default function App({Component, pageProps, router}) {
    const {locale} = router;
    //const currentMessages = messages[locale] || messages.en;
    const currentMessages = messages.en;

    return (
        <IntlProvider locale={locale} messages={currentMessages}>
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    mass: 5,
                    delay: 0.5
                }}
            >
                <Header title={"Blog"}/>
            </motion.div>
            <main className="page">
                <Component {...pageProps} />
                <Analytics/>
            </main>
        </IntlProvider>
    );
}
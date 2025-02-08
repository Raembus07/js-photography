import React from "react";
import Header from "@/components/Header";
import "@/styles/global.css";
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
    console.log(locale);
    //const currentMessages = messages[locale] || messages.en;
    const currentMessages = messages.en;

    return (
        <IntlProvider locale={locale} messages={currentMessages}>
            <Header title={"Blog"}/>
            <main className="page">
                <Component {...pageProps} />
                <Analytics/>
            </main>
        </IntlProvider>
    );
}
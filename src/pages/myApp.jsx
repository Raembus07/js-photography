import React from "react";
import App from "next/app";
import { IntlProvider } from "react-intl";
import enMessages from "@/locales/en.json";
import deMessages from "@/locales/de.json";
import frMessages from "@/locales/fr.json";

const messages = {
  en: enMessages,
  de: deMessages,
  fr: frMessages,
};

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const { locale } = router;
    const currentMessages = messages[locale] || messages.en;

    return (
      <IntlProvider locale={locale} messages={currentMessages}>
        <Component {...pageProps} />
      </IntlProvider>
    );
  }
}

export default MyApp;
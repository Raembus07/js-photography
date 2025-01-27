import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import enMessages from './locales/en.json';
import deMessages from './locales/de.json';
import deCHMessages from './locales/de-CH.json';
import frCHMessages from './locales/fr-CH.json';

const messages = {
    'en-US': enMessages,
    'de-German': deMessages,
    'de-Swiss': deCHMessages,
    'fr-Swiss': frCHMessages,
};

const cache = createIntlCache();

const getIntl = (locale) => {
    return createIntl(
        {
            locale,
            messages: messages[locale],
        },
        cache
    );
};

export { getIntl, RawIntlProvider };
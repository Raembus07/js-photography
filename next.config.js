module.exports = {
    i18n: {
        locales: ['en-US', 'de-German', 'de-Swiss', 'fr-Swiss'],
        defaultLocale: 'en-US',
        domains: [
            {
                domain: 'example.com',
                defaultLocale: 'en-US',
            },
            {
                domain: 'example.de',
                defaultLocale: 'de-German',
            },
            {
                domain: 'example.ch',
                defaultLocale: 'de-Swiss',
            },
            {
                domain: 'example.fr',
                defaultLocale: 'fr-Swiss',
                http: true,
            },
        ],
    },
};
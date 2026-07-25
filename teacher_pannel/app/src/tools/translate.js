import cookie from "./cookie";
import locale from "./locale";

const translate = (value) => {
    const localeCookie = locale.get();

    if (localeCookie) {
        const translations = {
            kz: require('./lang/kz.json'),
            en: require('./lang/en.json'),
            ru: require('./lang/ru.json')
        };

        const localeTranslation = translations[localeCookie];

        if (localeTranslation) {
            const keys = value.split('.');
            let translatedValue = localeTranslation;

            for (const key of keys) {
                if (typeof translatedValue === 'object' && translatedValue !== null) {
                    translatedValue = translatedValue[key];
                } else {
                    break;
                }
            }

            if (typeof translatedValue === 'string') {
                return translatedValue;
            }
        }
    }

    return value;
};

export default translate;

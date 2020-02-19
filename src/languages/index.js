import { findBestAvailableLanguage } from 'react-native-localize';
import LocaleConfig from 'xdate';
import { format } from 'date-fns';
import I18n from 'i18n-js';

import es from './es';
import en from './en';
import pt from './pt';

LocaleConfig.locales.en_US = en.calendar_locale;
LocaleConfig.locales.es_ES = es.calendar_locale;
LocaleConfig.locales.pt_BR = pt.calendar_locale;

const normalizeTranslate = {
    en_US: 'en_US',
    'en-US': 'en_US',
    en_GB: 'en_US',
    'en-GB': 'en_US',
    en: 'en_US',

    es: 'es_ES',
    es_ES: 'es_ES',
    'es-ES': 'es_ES',
    es_US: 'es_ES',
    'es-US': 'es_ES',
    es_MX: 'es_ES',
    'es-MX': 'es_ES',

    pt: 'pt_BR',
    pt_BR: 'pt_BR',
    'pt-BR': 'pt_BR',
};

I18n.translations = {
    en_US: en,
    es_ES: es,
    pt_BR: pt,
};

export const getCurrentLanguage = () => {
    const { languageTag } = findBestAvailableLanguage([
        'en_US',
        'es_ES',
        'pt_BR',
        'en-US',
        'es-ES',
        'pt-BR',
        'en',
        'es',
        'pt',
    ]);
    return languageTag || 'en-US';
};

export const localeDateFormat = () => I18n.t('date_format');

export const formatMonthYear = date => {
    const month = format(date, 'M');
    const year = format(date, 'yyyy');
    return `${I18n.t(`calendar_locale.monthNames.${month - 1}`)}, ${year}`;
};

const setLanguageToI18n = () => {
    const language = getCurrentLanguage();
    const translateNormalize = normalizeTranslate[language];
    if (I18n.translations[translateNormalize]) {
        I18n.locale = translateNormalize;
        LocaleConfig.defaultLocale = translateNormalize;
    } else {
        I18n.locale = 'en_US';
        LocaleConfig.defaultLocale = 'en_US';
    }
};

setLanguageToI18n();

export default key => I18n.t(key);

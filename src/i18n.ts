import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import vi from './locales/vi/common.json'
import en from './locales/en/common.json'

void i18n.use(initReactI18next).init({
  resources: {
    vi: { common: vi },
    en: { common: en },
  },
  lng: 'vi',
  fallbackLng: 'vi',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
})

export default i18n

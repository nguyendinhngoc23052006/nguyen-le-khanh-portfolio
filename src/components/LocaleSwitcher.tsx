import { useTranslation } from 'react-i18next'

export default function LocaleSwitcher() {
  const { i18n } = useTranslation()
  const isEn =
    i18n.language === 'en' || window.location.pathname.startsWith('/en')
  const other = isEn ? '/' : '/en'
  const label = isEn ? 'VI' : 'EN'
  return (
    <a
      href={other}
      className="serif text-lg tracking-widest hover:opacity-70"
      aria-label={isEn ? 'Chuyển sang tiếng Việt' : 'Switch to English'}
    >
      {label}
    </a>
  )
}

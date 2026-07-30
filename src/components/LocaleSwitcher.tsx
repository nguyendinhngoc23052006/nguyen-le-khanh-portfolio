import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function LocaleSwitcher() {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()
  const isEn = i18n.language === 'en' || pathname.startsWith('/en')
  const other = isEn ? '/' : '/en'
  const label = isEn ? 'VI' : 'EN'
  return (
    <Link
      to={other}
      className="serif text-lg tracking-widest hover:opacity-70"
      aria-label={isEn ? 'Chuyển sang tiếng Việt' : 'Switch to English'}
    >
      {label}
    </Link>
  )
}

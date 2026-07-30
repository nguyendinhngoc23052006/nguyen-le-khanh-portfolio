import { useTranslation } from 'react-i18next'
import LocaleSwitcher from './LocaleSwitcher'

export default function Header() {
  const { t, i18n } = useTranslation()
  const home = i18n.language === 'en' ? '/en' : '/'
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference text-cream">
      <a href={home} className="serif text-lg tracking-tight">
        {t('header.mark')}
      </a>
      <LocaleSwitcher />
    </header>
  )
}

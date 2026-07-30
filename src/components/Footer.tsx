import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-forest/20 bg-cream px-6 py-8 text-sm text-forest">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <p>{t('footer.credit')}</p>
        <p className="opacity-70">{t('footer.year', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  )
}

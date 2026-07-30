import { useTranslation } from 'react-i18next'

const EMAIL = 'nglekhanh2507@gmail.com'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <section
      id="contact"
      className="flex min-h-screen w-full flex-col justify-center bg-forest-deep px-6 py-24 text-cream md:px-16 lg:px-24"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <span className="text-xs uppercase tracking-[0.3em] opacity-70">
          {t('contact.eyebrow')}
        </span>
        <h2 className="serif beat-text text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
          {t('contact.headline')}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed md:text-lg">
          {t('contact.body')}
        </p>
        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent(t('contact.subject'))}`}
          className="serif inline-block w-fit border-b border-cream pb-1 text-2xl italic transition hover:opacity-70 md:text-3xl"
        >
          {EMAIL}
        </a>
      </div>
    </section>
  )
}

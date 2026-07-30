import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between bg-forest-deep px-6 py-16 text-cream md:px-16 lg:px-24"
    >
      <div className="pt-24 text-xs uppercase tracking-[0.3em] opacity-70">
        {t('hero.eyebrow')}
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 pb-24">
        <h1 className="serif beat-text text-6xl leading-[0.95] md:text-8xl lg:text-[10rem]">
          {t('hero.name')}
        </h1>
        <p className="serif beat-text max-w-3xl text-2xl italic leading-snug md:text-4xl">
          {t('hero.tagline')}
        </p>
        <p className="max-w-xl text-sm uppercase tracking-widest opacity-70">
          {t('hero.scrollCue')}
        </p>
      </div>
    </section>
  )
}

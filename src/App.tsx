import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { initScroll } from './lib/scroll'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Belief from './sections/Belief'
import WorkStudentUnion from './sections/WorkStudentUnion'
import WorkContest from './sections/WorkContest'
import WorkEvents from './sections/WorkEvents'
import Community from './sections/Community'
import Learning from './sections/Learning'
import SiteIsSample from './sections/SiteIsSample'
import Ready from './sections/Ready'
import Contact from './sections/Contact'

type Props = { locale: 'vi' | 'en' }

export default function App({ locale }: Props) {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language !== locale) void i18n.changeLanguage(locale)
    document.documentElement.lang = locale
  }, [locale, i18n])

  useEffect(() => {
    const cleanup = initScroll()
    return cleanup
  }, [])

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Header />
      <main>
        <Hero />
        <Belief />
        <WorkStudentUnion />
        <WorkContest />
        <WorkEvents />
        <Community />
        <Learning />
        <SiteIsSample />
        <Ready />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

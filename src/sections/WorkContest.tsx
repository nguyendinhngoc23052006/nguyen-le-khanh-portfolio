import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion, splitLetters } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

export default function WorkContest() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const clockHandRef = useRef<SVGLineElement>(null)
  const reduced = useReducedMotion()

  const headline = t('workContest.headline')

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(['.wc-letter', eyebrowRef.current, bodyRef.current, cursorRef.current], {
          opacity: 1,
        })
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set('.wc-paper', { opacity: 0, y: 20 })
      gsap.set('.wc-underline', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.wc-letter', { opacity: 0 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set(cursorRef.current, { opacity: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.7, duration: 0.05 }, 0)
      tl.to('.wc-paper', { opacity: 1, y: 0, duration: 0.2 }, 0.05)
      tl.to('.wc-underline', { scaleX: 1, duration: 0.3, ease: 'power2.out' }, 0.2)
      tl.to(
        '.wc-letter',
        {
          opacity: 1,
          duration: 0.02,
          stagger: 0.012,
          ease: 'none',
        },
        0.35,
      )
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.8)

      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'steps(1)',
      })
      if (clockHandRef.current) {
        gsap.to(clockHandRef.current, {
          rotate: 360,
          duration: 4,
          repeat: -1,
          ease: 'none',
          transformOrigin: '30px 30px',
        })
      }
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const letters = splitLetters(headline)

  return (
    <section
      id="work-contest"
      ref={root}
      className="relative w-full bg-cream text-forest-deep"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('workContest.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">04 / 10</span>
        </div>

        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
          <div className="wc-paper relative rounded-sm border border-forest/15 bg-cream px-6 py-8 shadow-sm md:px-10 md:py-12">
            <svg
              aria-hidden="true"
              className="absolute right-4 top-4 h-14 w-14 text-forest md:right-6 md:top-6"
              viewBox="0 0 60 60"
            >
              <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.6" />
              <line
                ref={clockHandRef}
                x1="30"
                y1="30"
                x2="30"
                y2="10"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
            <h2
              ref={headlineRef}
              className="serif beat-text pr-16 text-3xl leading-[1.1] md:text-5xl lg:text-6xl"
            >
              {letters.map((ch, i) => (
                <span
                  key={i}
                  className="wc-letter"
                  style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                  {ch}
                </span>
              ))}
              <span
                ref={cursorRef}
                aria-hidden="true"
                className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 bg-forest-deep align-middle"
              />
            </h2>
            <div className="wc-underline mt-6 h-px w-full bg-forest/25" />
          </div>

          <p
            ref={bodyRef}
            className="beat-text max-w-2xl text-base leading-relaxed md:text-lg"
          >
            {t('workContest.body')}
          </p>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion, splitLetters } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const BIRDS = [
  { x: 18, y: 55, size: 14 },
  { x: 32, y: 50, size: 10 },
  { x: 60, y: 58, size: 16 },
  { x: 78, y: 52, size: 12 },
  { x: 88, y: 60, size: 10 },
]

export default function Ready() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const headline = t('ready.headline')

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([headlineRef.current, bodyRef.current, sunRef.current, glowRef.current, '.rd-bird', '.rd-letter'], { opacity: 1 })
        gsap.set(sunRef.current, { y: 0 })
        return
      }

      gsap.set(sunRef.current, { y: 300, opacity: 0 })
      gsap.set(glowRef.current, { opacity: 0 })
      gsap.set('.rd-letter', { opacity: 0, y: 40 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.rd-bird', { opacity: 0, x: -30 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      tl.to(glowRef.current, { opacity: 0.9, duration: 0.4 }, 0)
      tl.to(sunRef.current, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.05)
      tl.to(
        '.rd-letter',
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        0.3,
      )
      tl.to(
        '.rd-bird',
        { opacity: 0.9, x: 0, duration: 0.5, stagger: 0.08, ease: 'power1.out' },
        0.55,
      )
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.75)
    }, root)
    return () => ctx.revert()
  }, [reduced, headline])

  const letters = splitLetters(headline)

  return (
    <section
      id="ready"
      ref={root}
      className="relative w-full overflow-hidden bg-cream text-forest-deep"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              'linear-gradient(to top, rgba(198,139,60,0.9) 0%, rgba(198,139,60,0.4) 40%, transparent 80%)',
          }}
        />
        <div
          ref={sunRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,220,160,1) 0%, rgba(198,139,60,0.6) 40%, rgba(198,139,60,0) 70%)',
          }}
        />

        <div className="relative z-10 flex justify-between">
          <span className="text-xs uppercase tracking-[0.3em] opacity-70">
            {t('contact.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">09 / 10</span>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center">
          <h2
            ref={headlineRef}
            className="serif beat-text text-7xl leading-none md:text-9xl lg:text-[12rem]"
          >
            {letters.map((ch, i) => (
              <span key={i} className="rd-letter inline-block" style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}>
                {ch}
              </span>
            ))}
          </h2>
          <p
            ref={bodyRef}
            className="beat-text max-w-2xl text-base leading-relaxed md:text-lg"
          >
            {t('ready.body')}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-24 h-16">
          {BIRDS.map((b, i) => (
            <svg
              key={i}
              className="rd-bird absolute text-forest-deep"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size * 2}px`,
                height: `${b.size}px`,
              }}
              viewBox="0 0 20 10"
              aria-hidden="true"
            >
              <path
                d="M 1 8 Q 5 2 10 6 Q 15 2 19 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          ))}
        </div>
      </div>
    </section>
  )
}

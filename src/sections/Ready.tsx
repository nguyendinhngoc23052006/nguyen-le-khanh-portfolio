import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion, splitWordsIntoLetters } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const BIRDS = [
  { x: 14, y: 62, size: 18, delay: 0 },
  { x: 24, y: 56, size: 12, delay: 0.1 },
  { x: 38, y: 60, size: 14, delay: 0.05 },
  { x: 54, y: 55, size: 16, delay: 0.15 },
  { x: 68, y: 63, size: 12, delay: 0.2 },
  { x: 82, y: 58, size: 20, delay: 0.08 },
  { x: 92, y: 65, size: 10, delay: 0.25 },
]

export default function Ready() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const mistRef = useRef<HTMLDivElement>(null)
  const horizonRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const headline = t('ready.headline')
  const wordLetters = splitWordsIntoLetters(headline)

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [
            bodyRef.current,
            sunRef.current,
            glowRef.current,
            skyRef.current,
            mistRef.current,
            horizonRef.current,
            '.rd-bird',
            '.rd-letter',
          ],
          { opacity: 1 },
        )
        gsap.set(sunRef.current, { y: 0 })
        return
      }

      gsap.set(sunRef.current, { y: 320, opacity: 0 })
      gsap.set(glowRef.current, { opacity: 0 })
      gsap.set(skyRef.current, { opacity: 0 })
      gsap.set(mistRef.current, { opacity: 0, y: 20 })
      gsap.set(horizonRef.current, { scaleX: 0, transformOrigin: 'center' })
      gsap.set('.rd-letter', { opacity: 0, y: 60 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.rd-bird', { opacity: 0, x: -40 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      tl.to(skyRef.current, { opacity: 1, duration: 0.35 }, 0)
      tl.to(glowRef.current, { opacity: 1, duration: 0.4 }, 0.05)
      tl.to(sunRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.1)
      tl.to(horizonRef.current, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, 0.25)
      tl.to(mistRef.current, { opacity: 0.6, y: 0, duration: 0.4 }, 0.3)
      tl.to(
        '.rd-letter',
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
        0.4,
      )
      tl.to(
        '.rd-bird',
        { opacity: 0.9, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
        0.6,
      )
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.35 }, 0.78)

      gsap.to(sunRef.current, {
        scale: 1.05,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to(mistRef.current, {
        x: 20,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      BIRDS.forEach((b, i) => {
        gsap.to(`.rd-bird-${i}`, {
          y: '+=6',
          duration: 1.6 + b.delay * 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: b.delay,
        })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced, headline])

  return (
    <section
      id="ready"
      ref={root}
      className="relative w-full overflow-hidden bg-forest-deep text-cream"
      style={{ minHeight: '340vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div
          ref={skyRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #122015 0%, #2c2418 30%, #6a4a2a 55%, #c68b3c 78%, #f5c98a 92%, #f5efe4 100%)',
          }}
        />
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(255,220,150,0.85) 0%, rgba(198,139,60,0.4) 40%, transparent 75%)',
          }}
        />
        <div
          ref={sunRef}
          className="pointer-events-none absolute left-1/2 top-[58%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,235,190,0.95) 0%, rgba(255,200,120,0.7) 25%, rgba(198,139,60,0.35) 50%, rgba(198,139,60,0) 72%)',
            filter: 'blur(1px)',
          }}
        />
        <div
          ref={horizonRef}
          className="pointer-events-none absolute left-1/2 top-[80%] h-px w-3/4 -translate-x-1/2 bg-forest-deep opacity-40"
        />
        <div
          ref={mistRef}
          className="pointer-events-none absolute inset-x-0 top-[70%] h-24"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(245,239,228,0.35) 50%, transparent 100%)',
            filter: 'blur(4px)',
          }}
        />

        <div className="relative z-10 flex justify-between">
          <span className="text-xs uppercase tracking-[0.3em] opacity-70">
            {t('contact.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">09 / 10</span>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center">
          <h2 className="serif beat-text text-7xl leading-[0.9] md:text-9xl lg:text-[11rem]">
            {wordLetters.map((word, wi) => (
              <span
                key={wi}
                className="mr-[0.25em] inline-block whitespace-nowrap last:mr-0"
              >
                {word.map((ch, li) => (
                  <span key={li} className="rd-letter inline-block">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p
            ref={bodyRef}
            className="beat-text max-w-2xl text-base leading-relaxed text-forest-deep/85 md:text-lg"
          >
            {t('ready.body')}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-32 h-20">
          {BIRDS.map((b, i) => (
            <svg
              key={i}
              className={`rd-bird rd-bird-${i} absolute text-forest-deep`}
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

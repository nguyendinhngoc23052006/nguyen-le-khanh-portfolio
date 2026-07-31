import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

// Audience silhouettes in the front row facing the stage.
const AUDIENCE = Array.from({ length: 14 }, (_, i) => ({
  x: 40 + i * 32,
  scale: 0.9 + ((i * 37) % 10) / 40,
}))

export default function WorkEvents() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [
            eyebrowRef.current,
            headlineRef.current,
            bodyRef.current,
            '.ev-stage',
            '.ev-backdrop',
            '.ev-banner',
            '.ev-spot',
            '.ev-audience',
          ],
          { opacity: 1 },
        )
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.ev-backdrop', { opacity: 0, y: -20, transformOrigin: 'center top' })
      gsap.set('.ev-banner', { opacity: 0, scaleX: 0, transformOrigin: 'center' })
      gsap.set('.ev-stage', { opacity: 0, y: 20 })
      gsap.set('.ev-spot', { opacity: 0, scaleY: 0, transformOrigin: 'center top' })
      gsap.set('.ev-audience', { opacity: 0, y: 20, transformOrigin: 'center bottom' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.75, duration: 0.05 }, 0)
      tl.to('.ev-backdrop', { opacity: 1, y: 0, duration: 0.25 }, 0.05)
      tl.to('.ev-banner', { opacity: 1, scaleX: 1, duration: 0.28, ease: 'power2.out' }, 0.18)
      tl.to('.ev-stage', { opacity: 1, y: 0, duration: 0.22 }, 0.12)
      tl.to('.ev-spot', { opacity: 0.55, scaleY: 1, duration: 0.3, ease: 'power2.out' }, 0.25)
      tl.to(
        '.ev-audience',
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          stagger: { each: 0.03, from: 'random' },
          ease: 'back.out(1.5)',
        },
        0.35,
      )
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.6)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.78)

      // Idle: spotlight flickers, audience gently sways, one member "claps" (jiggles)
      gsap.to('.ev-spot', {
        opacity: 0.75,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      AUDIENCE.forEach((_, i) => {
        gsap.to(`.ev-audience-${i}`, {
          y: '+=2',
          duration: 1.8 + (i % 3) * 0.3,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: (i % 5) * 0.15,
        })
      })
      gsap.to('.ev-audience-5', {
        scaleY: 1.08,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center bottom',
      })
      gsap.to('.ev-banner', {
        skewX: 0.8,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="work-events"
      ref={root}
      className="relative w-full bg-forest text-cream"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-20 md:px-16 md:py-24 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('workEvents.eyebrow')}
          </span>
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-10 lg:gap-12">
          <svg
            viewBox="0 0 500 380"
            aria-hidden="true"
            className="h-64 w-full max-w-2xl md:h-72 lg:h-80"
          >
            <defs>
              <linearGradient id="ev-spot-grad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,230,155,0.7)" />
                <stop offset="100%" stopColor="rgba(255,230,155,0)" />
              </linearGradient>
            </defs>

            {/* Backdrop */}
            <rect className="ev-backdrop" x="60" y="30" width="380" height="180" fill="#0f1b12" />
            <rect className="ev-backdrop" x="60" y="30" width="380" height="4" fill="#c68b3c" />

            {/* Banner across backdrop */}
            <g className="ev-banner">
              <path d="M 100 60 L 400 60 L 385 90 L 115 90 Z" fill="#c68b3c" />
              <line x1="130" y1="72" x2="200" y2="72" stroke="#122015" strokeWidth="1.5" opacity="0.6" />
              <line x1="210" y1="72" x2="280" y2="72" stroke="#122015" strokeWidth="1.5" opacity="0.6" />
              <line x1="290" y1="72" x2="370" y2="72" stroke="#122015" strokeWidth="1.5" opacity="0.6" />
            </g>

            {/* Spotlight beam from top */}
            <path
              className="ev-spot"
              d="M 230 30 L 170 260 L 330 260 L 270 30 Z"
              fill="url(#ev-spot-grad)"
            />

            {/* Stage */}
            <rect className="ev-stage" x="80" y="240" width="340" height="30" fill="#8a6c3a" rx="2" />
            <rect className="ev-stage" x="80" y="270" width="340" height="12" fill="#5a3f1a" />

            {/* Audience silhouettes */}
            <g>
              {AUDIENCE.map((a, i) => (
                <g
                  key={i}
                  className={`ev-audience ev-audience-${i}`}
                  transform={`translate(${a.x} 340) scale(${a.scale})`}
                >
                  <circle cx="0" cy="-10" r="6" fill="#050e07" />
                  <path
                    d="M -9 20 C -11 8 -6 -2 0 -2 C 6 -2 11 8 9 20 Z"
                    fill="#050e07"
                  />
                </g>
              ))}
            </g>

            {/* Floor edge line */}
            <line x1="0" y1="340" x2="500" y2="340" stroke="#0f1b12" strokeWidth="1" opacity="0.6" />
          </svg>

          <div className="flex flex-col items-center gap-6 text-center">
            <h2
              ref={headlineRef}
              className="serif beat-text max-w-3xl text-3xl leading-[1.1] md:text-4xl lg:text-5xl"
            >
              {t('workEvents.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('workEvents.body')}
            </p>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

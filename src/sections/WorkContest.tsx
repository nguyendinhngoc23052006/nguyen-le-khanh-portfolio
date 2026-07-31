import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const NOTEBOOK_LINES = [
  { y: 195, w: 130 },
  { y: 210, w: 145 },
  { y: 225, w: 105 },
  { y: 240, w: 150 },
  { y: 255, w: 90 },
]

const STEAM = Array.from({ length: 5 }, (_, i) => ({
  x: 385 + (i % 2 === 0 ? -6 : 6),
  delay: i * 0.5,
  duration: 3 + (i % 3) * 0.5,
}))

export default function WorkContest() {
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
            '.wc-desk',
            '.wc-notebook',
            '.wc-line',
            '.wc-pen',
            '.wc-mug',
            '.wc-lamp',
            '.wc-light',
            '.wc-plant',
            '.wc-steam',
          ],
          { opacity: 1 },
        )
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.wc-desk', { opacity: 0, y: 20 })
      gsap.set('.wc-notebook', { opacity: 0, y: 10 })
      gsap.set('.wc-line', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.wc-pen', { opacity: 0, x: 20, rotate: 12 })
      gsap.set('.wc-mug', { opacity: 0, y: 15 })
      gsap.set('.wc-lamp', { opacity: 0, y: -10 })
      gsap.set('.wc-light', { opacity: 0, scaleY: 0, transformOrigin: 'center top' })
      gsap.set('.wc-plant', { opacity: 0, scale: 0.5, transformOrigin: 'center bottom' })
      gsap.set('.wc-steam', { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.75, duration: 0.05 }, 0)
      tl.to('.wc-desk', { opacity: 1, y: 0, duration: 0.25 }, 0.05)
      tl.to('.wc-lamp', { opacity: 1, y: 0, duration: 0.25 }, 0.1)
      tl.to('.wc-light', { opacity: 0.55, scaleY: 1, duration: 0.3, ease: 'power2.out' }, 0.18)
      tl.to('.wc-plant', { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(1.6)' }, 0.15)
      tl.to('.wc-mug', { opacity: 1, y: 0, duration: 0.25 }, 0.2)
      tl.to('.wc-notebook', { opacity: 1, y: 0, duration: 0.25 }, 0.25)
      tl.to('.wc-line', { scaleX: 1, duration: 0.2, stagger: 0.06, ease: 'none' }, 0.3)
      tl.to('.wc-pen', { opacity: 1, x: 0, rotate: 0, duration: 0.25, ease: 'back.out(1.4)' }, 0.55)
      tl.to('.wc-steam', { opacity: 0.7, duration: 0.3 }, 0.4)
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.62)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.8)

      // Idle: steam keeps rising, lamp light flickers subtly, plant sways
      STEAM.forEach((s, i) => {
        gsap.to(`.wc-steam-${i}`, {
          y: -80,
          opacity: 0,
          duration: s.duration,
          repeat: -1,
          ease: 'sine.out',
          delay: s.delay,
        })
      })
      gsap.to('.wc-light', {
        opacity: 0.75,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.wc-plant', {
        skewX: 1.2,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center bottom',
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="work-contest"
      ref={root}
      className="relative w-full bg-cream text-forest-deep"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-20 md:px-16 md:py-24 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('workContest.eyebrow')}
          </span>
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-10 lg:gap-12">
          <svg
            viewBox="0 0 500 380"
            aria-hidden="true"
            className="h-64 w-full max-w-2xl md:h-72 lg:h-80"
          >
            {/* Lamp cone light (behind everything) */}
            <path
              className="wc-light"
              d="M 150 110 L 120 320 L 260 320 L 220 110 Z"
              fill="url(#wc-light-grad)"
            />
            <defs>
              <linearGradient id="wc-light-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,230,160,0.75)" />
                <stop offset="100%" stopColor="rgba(255,230,160,0)" />
              </linearGradient>
            </defs>

            {/* Desk surface */}
            <rect className="wc-desk" x="20" y="290" width="460" height="12" rx="2" fill="#8a6c3a" />
            <rect className="wc-desk" x="20" y="302" width="460" height="60" rx="2" fill="#6a4f26" />

            {/* Lamp */}
            <g className="wc-lamp">
              <line x1="185" y1="290" x2="185" y2="180" stroke="#122015" strokeWidth="3" strokeLinecap="round" />
              <line x1="185" y1="180" x2="150" y2="130" stroke="#122015" strokeWidth="3" strokeLinecap="round" />
              <path d="M 130 100 L 175 100 L 168 135 L 135 135 Z" fill="#122015" />
              <ellipse cx="185" cy="292" rx="18" ry="4" fill="#122015" />
            </g>

            {/* Notebook (open) */}
            <g className="wc-notebook">
              <rect x="240" y="180" width="200" height="110" rx="3" fill="#f5efe4" stroke="#c9c0a8" strokeWidth="1"
                style={{ filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.15))' }} />
              {/* Spine */}
              <line x1="340" y1="180" x2="340" y2="290" stroke="#c9c0a8" strokeWidth="1" />
              {/* Rule lines (all pre-drawn light) */}
              {NOTEBOOK_LINES.map((l, i) => (
                <line key={`r${i}`} x1="255" y1={l.y} x2="425" y2={l.y} stroke="#e6ddc4" strokeWidth="0.75" />
              ))}
              {/* Text lines (get drawn as pen writes) */}
              {NOTEBOOK_LINES.map((l, i) => (
                <line
                  key={`t${i}`}
                  className="wc-line"
                  x1={l.y > 220 ? 355 : 255}
                  y1={l.y - 2}
                  x2={l.y > 220 ? 355 + l.w : 255 + l.w}
                  y2={l.y - 2}
                  stroke="#3a2f1c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Pen resting on notebook */}
            <g className="wc-pen" transform="translate(400 260) rotate(-15)">
              <rect x="-40" y="-3" width="60" height="6" rx="2" fill="#122015" />
              <polygon points="20,-3 32,0 20,3" fill="#c68b3c" />
              <rect x="-40" y="-3" width="12" height="6" fill="#c68b3c" />
            </g>

            {/* Coffee mug */}
            <g className="wc-mug">
              <rect x="360" y="245" width="50" height="45" rx="3" fill="#f5efe4" stroke="#8a7550" strokeWidth="1.5" />
              <path d="M 410 255 Q 425 260 415 275 Q 410 280 410 275" fill="none" stroke="#8a7550" strokeWidth="2" />
              <ellipse cx="385" cy="248" rx="24" ry="4" fill="#5a3a1a" opacity="0.9" />
            </g>

            {/* Steam rising from mug */}
            <g className="wc-steam-group">
              {STEAM.map((s, i) => (
                <ellipse
                  key={i}
                  className={`wc-steam wc-steam-${i}`}
                  cx={s.x}
                  cy="240"
                  rx="3"
                  ry="5"
                  fill="rgba(180,170,150,0.6)"
                />
              ))}
            </g>

            {/* Plant in corner */}
            <g className="wc-plant" transform="translate(70 300)">
              <rect x="-16" y="0" width="32" height="20" fill="#8a5a2a" />
              <path d="M -12 0 Q -20 -30 -8 -40 Q 0 -25 -6 -5" fill="#3a5a45" />
              <path d="M 0 0 Q -4 -35 6 -50 Q 14 -30 4 -4" fill="#3a5a45" />
              <path d="M 12 0 Q 20 -30 8 -40 Q 0 -25 6 -5" fill="#3a5a45" opacity="0.85" />
            </g>
          </svg>

          <div className="flex flex-col items-center gap-6 text-center">
            <h2
              ref={headlineRef}
              className="serif beat-text max-w-3xl text-3xl leading-[1.1] md:text-4xl lg:text-5xl"
            >
              {t('workContest.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('workContest.body')}
            </p>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

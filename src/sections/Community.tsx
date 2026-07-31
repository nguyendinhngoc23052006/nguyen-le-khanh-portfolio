import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

// 8 figures evenly spaced around a warm center (a campfire).
// Writer is index 4 (bottom-center), slightly larger.
const FIGURES = [
  { x: 250, y: 60, isWriter: false },
  { x: 391, y: 109, isWriter: false },
  { x: 450, y: 250, isWriter: false },
  { x: 391, y: 391, isWriter: false },
  { x: 250, y: 440, isWriter: true },
  { x: 109, y: 391, isWriter: false },
  { x: 50, y: 250, isWriter: false },
  { x: 109, y: 109, isWriter: false },
]

const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  offsetX: ((i * 137) % 40) - 20,
  delay: (i * 0.35) % 5,
  duration: 3 + (i % 4),
}))

export default function Community() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const root = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const chophraseRef = useRef<HTMLSpanElement>(null)
  const vephraseRef = useRef<HTMLSpanElement>(null)
  const strikeRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [
            eyebrowRef.current,
            bodyRef.current,
            '.co-headline',
            '.co-figure',
            '.co-fire-outer',
            '.co-fire-mid',
            '.co-fire-core',
            '.co-flame',
            '.co-ring',
            '.co-spark',
          ],
          { opacity: 1 },
        )
        gsap.set(strikeRef.current, { scaleX: 1 })
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set('.co-headline', { opacity: 0, y: 20 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.co-fire-outer', { opacity: 0, scale: 0.5, transformOrigin: '250px 275px' })
      gsap.set('.co-fire-mid', { opacity: 0, scale: 0.4, transformOrigin: '250px 275px' })
      gsap.set('.co-fire-core', { opacity: 0, scale: 0, transformOrigin: '250px 275px' })
      gsap.set('.co-flame', { opacity: 0, scaleY: 0, transformOrigin: '250px 300px' })
      gsap.set('.co-figure', { opacity: 0, y: 12, transformOrigin: 'center' })
      gsap.set('.co-ring', { opacity: 0, strokeDasharray: 1500, strokeDashoffset: 1500 })
      gsap.set('.co-spark', { opacity: 0 })
      gsap.set(chophraseRef.current, { color: 'inherit' })
      gsap.set(strikeRef.current, { scaleX: 0, transformOrigin: 'left center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.75, duration: 0.05 }, 0)

      // Fire lights first — the reason everyone's gathering
      tl.to('.co-fire-outer', { opacity: 0.55, scale: 1, duration: 0.22 }, 0.05)
      tl.to('.co-fire-mid', { opacity: 0.75, scale: 1, duration: 0.2 }, 0.1)
      tl.to('.co-fire-core', { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(2)' }, 0.15)
      tl.to('.co-flame', { opacity: 0.85, scaleY: 1, duration: 0.18, stagger: 0.03 }, 0.18)

      // The gathering ring appears (a subtle circle of belonging)
      tl.to('.co-ring', { opacity: 0.25, strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 0.22)

      // People arrive, one by one, from where they were
      tl.to(
        '.co-figure',
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          stagger: { each: 0.045, from: 4 },
          ease: 'power2.out',
        },
        0.28,
      )

      // Sparks rise from the fire
      tl.to(
        '.co-spark',
        { opacity: 0.9, duration: 0.4, stagger: { amount: 0.4, from: 'random' } },
        0.4,
      )

      // Headline
      tl.to('.co-headline', { opacity: 1, y: 0, duration: 0.3 }, 0.55)
      tl.to(strikeRef.current, { scaleX: 1, duration: 0.25, ease: 'power2.out' }, 0.72)
      tl.to(chophraseRef.current, { color: '#122015', fontWeight: 600, duration: 0.15 }, 0.75)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.82)

      // Idle loops — fire flickers, flames dance, sparks keep rising, people breathe
      gsap.to('.co-fire-core', {
        scale: 1.15,
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.co-fire-mid', {
        scale: 1.08,
        opacity: 0.85,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.co-fire-outer', {
        opacity: 0.7,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.co-flame', {
        scaleY: 1.15,
        duration: 0.7,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: '250px 300px',
        stagger: { each: 0.15, from: 'random' },
      })
      gsap.to('.co-figure', {
        y: '+=3',
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.15, from: 'random' },
      })
      // Sparks continuously rise + fade
      SPARKS.forEach((_, i) => {
        gsap.to(`.co-spark-${i}`, {
          y: -180 - (i % 4) * 20,
          opacity: 0,
          duration: SPARKS[i].duration,
          repeat: -1,
          ease: 'power1.out',
          delay: SPARKS[i].delay,
        })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="community"
      ref={root}
      className="relative w-full bg-ochre text-forest-deep"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-20 md:px-16 md:py-24 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('community.eyebrow')}
          </span>
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-10 lg:gap-12">
          {/* Campfire circle */}
          <svg
            viewBox="0 0 500 500"
            aria-hidden="true"
            className="h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96"
          >
            <defs>
              <radialGradient id="co-fire-grad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#fff4d6" />
                <stop offset="30%" stopColor="#ffc770" />
                <stop offset="70%" stopColor="#d97528" />
                <stop offset="100%" stopColor="rgba(217,117,40,0)" />
              </radialGradient>
              <radialGradient id="co-glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(255,215,140,0.7)" />
                <stop offset="60%" stopColor="rgba(255,175,90,0.25)" />
                <stop offset="100%" stopColor="rgba(255,175,90,0)" />
              </radialGradient>
            </defs>

            {/* Subtle ground / gathering ring */}
            <circle
              className="co-ring"
              cx="250"
              cy="275"
              r="205"
              fill="none"
              stroke="#122015"
              strokeWidth="0.75"
              strokeDasharray="4 6"
            />

            {/* Fire glow — outer, mid, core */}
            <circle className="co-fire-outer" cx="250" cy="275" r="110" fill="url(#co-glow)" />
            <circle className="co-fire-mid" cx="250" cy="275" r="50" fill="url(#co-fire-grad)" />
            <circle className="co-fire-core" cx="250" cy="275" r="18" fill="#fff4d6" />

            {/* Flame tongues */}
            <path
              className="co-flame"
              d="M 232 300 Q 228 260 240 240 Q 250 220 258 245 Q 268 268 260 300 Z"
              fill="#ff9840"
              opacity="0.85"
            />
            <path
              className="co-flame"
              d="M 250 305 Q 248 268 260 250 Q 272 235 275 265 Q 278 290 268 305 Z"
              fill="#ffb864"
              opacity="0.85"
            />
            <path
              className="co-flame"
              d="M 240 302 Q 236 275 244 260 Q 252 248 253 275 Q 253 295 246 302 Z"
              fill="#ffd68a"
              opacity="0.9"
            />

            {/* Sparks rising */}
            <g>
              {SPARKS.map((s, i) => (
                <circle
                  key={i}
                  className={`co-spark co-spark-${i}`}
                  cx={250 + s.offsetX}
                  cy="270"
                  r={i % 3 === 0 ? '2.5' : '1.5'}
                  fill="#fff0c8"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(255,215,140,0.9))' }}
                />
              ))}
            </g>

            {/* Figures gathered around the fire */}
            {FIGURES.map((f, i) => {
              const s = f.isWriter ? 1.25 : 1
              return (
                <g
                  key={i}
                  className={`co-figure co-figure-${i}`}
                  transform={`translate(${f.x} ${f.y}) scale(${s})`}
                >
                  {/* Head */}
                  <circle cx="0" cy="-14" r="10" fill="#122015" />
                  {/* Body — rounded trapezoid */}
                  <path
                    d="M -12 18 C -14 8 -10 -4 0 -4 C 10 -4 14 8 12 18 Z"
                    fill="#122015"
                  />
                  {f.isWriter ? (
                    <circle
                      cx="0"
                      cy="2"
                      r="20"
                      fill="none"
                      stroke="#122015"
                      strokeWidth="1"
                      strokeDasharray="2 3"
                      opacity="0.5"
                    />
                  ) : null}
                </g>
              )
            })}
          </svg>

          {/* Headline + body — centered below the fire */}
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="co-headline serif beat-text max-w-3xl text-3xl leading-[1.1] md:text-4xl lg:text-5xl">
              {isEn ? (
                <>
                  I write{' '}
                  <span ref={chophraseRef}>for</span>{' '}
                  a community —{' '}
                  <br className="hidden md:inline" />
                  not{' '}
                  <span className="relative inline-block">
                    <span ref={vephraseRef}>about</span>
                    <span
                      ref={strikeRef}
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 block h-[3px] w-full bg-forest-deep"
                    />
                  </span>{' '}
                  it.
                </>
              ) : (
                <>
                  Viết{' '}
                  <span ref={chophraseRef}>cho</span>{' '}
                  cộng đồng —{' '}
                  <br className="hidden md:inline" />
                  không viết{' '}
                  <span className="relative inline-block">
                    <span ref={vephraseRef}>về</span>
                    <span
                      ref={strikeRef}
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 block h-[3px] w-full bg-forest-deep"
                    />
                  </span>{' '}
                  họ.
                </>
              )}
            </h2>
            <p
              ref={bodyRef}
              className="max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('community.body')}
            </p>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

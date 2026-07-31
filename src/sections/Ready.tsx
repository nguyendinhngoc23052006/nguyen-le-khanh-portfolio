import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion, randomPoints } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const STARS = randomPoints(50, 91)
const PARTICLES = randomPoints(28, 137)

const RAYS = Array.from({ length: 24 }, (_, i) => ({
  angle: (i / 24) * 360,
  short: i % 2 === 0,
}))

const FLOCKS = [
  { y: 24, birds: 5, size: 12, dur: 26, delay: 0 },
  { y: 32, birds: 8, size: 16, dur: 32, delay: -8 },
  { y: 42, birds: 6, size: 14, dur: 40, delay: -16 },
]

export default function Ready() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const raysRef = useRef<SVGSVGElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const mountainsRef = useRef<SVGSVGElement>(null)
  const mistRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [
            skyRef.current,
            glowRef.current,
            sunRef.current,
            raysRef.current,
            mountainsRef.current,
            mistRef.current,
            eyebrowRef.current,
            headlineRef.current,
            bodyRef.current,
            '.rd-bird',
            '.rd-particle',
          ],
          { opacity: 1 },
        )
        return
      }

      gsap.set(skyRef.current, { opacity: 0 })
      gsap.set(starsRef.current, { opacity: 0 })
      gsap.set(glowRef.current, { opacity: 0 })
      gsap.set(sunRef.current, { y: 320, opacity: 0, scale: 0.85 })
      gsap.set(raysRef.current, { opacity: 0, scale: 0.7, transformOrigin: 'center' })
      gsap.set(mountainsRef.current, { opacity: 0, y: 30 })
      gsap.set(mistRef.current, { opacity: 0 })
      gsap.set(eyebrowRef.current, { opacity: 0, y: 10 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30, scale: 0.96 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.rd-bird', { opacity: 0 })
      gsap.set('.rd-particle', { opacity: 0 })

      // GSAP-managed pin: no outer-min-height / sticky-inner hack.
      // The section is h-screen and ScrollTrigger creates the pin scroll spacer
      // itself, so there's no empty tail before the next section.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
        },
      })

      tl.to(skyRef.current, { opacity: 1, duration: 0.1 }, 0)
      tl.to(starsRef.current, { opacity: 0.9, duration: 0.08 }, 0.02)
      tl.to(eyebrowRef.current, { opacity: 0.85, y: 0, duration: 0.1 }, 0.05)
      tl.to(glowRef.current, { opacity: 1, duration: 0.15 }, 0.05)
      tl.to(starsRef.current, { opacity: 0, duration: 0.12 }, 0.1)
      tl.to(mountainsRef.current, { opacity: 1, y: 0, duration: 0.18 }, 0.08)
      tl.to(sunRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.28, ease: 'power3.out' }, 0.1)
      tl.to(raysRef.current, { opacity: 0.9, scale: 1, duration: 0.28, ease: 'power2.out' }, 0.12)
      tl.to(mistRef.current, { opacity: 0.55, duration: 0.15 }, 0.2)
      tl.to(headlineRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power3.out' }, 0.18)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.18 }, 0.28)
      tl.to('.rd-bird', { opacity: 0.9, duration: 0.25, stagger: 0.008 }, 0.3)
      tl.to(
        '.rd-particle',
        { opacity: 0.7, duration: 0.3, stagger: { amount: 0.3, from: 'random' } },
        0.34,
      )

      gsap.to(sunRef.current, {
        scale: 1.04,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to(raysRef.current, {
        rotate: 360,
        duration: 120,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center',
      })
      gsap.to(mistRef.current, {
        x: 30,
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      FLOCKS.forEach((f, i) => {
        gsap.fromTo(
          `.rd-flock-${i}`,
          { x: '-25vw' },
          { x: '125vw', duration: f.dur, repeat: -1, ease: 'none', delay: f.delay },
        )
        gsap.to(`.rd-flock-${i} .rd-bird`, {
          y: '+=5',
          duration: 1.3 + i * 0.15,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          stagger: { each: 0.08, from: 'random' },
        })
      })
      PARTICLES.forEach((_, i) => {
        gsap.to(`.rd-particle-${i}`, {
          y: '-=50',
          duration: 6 + (i % 5),
          repeat: -1,
          ease: 'none',
        })
      })
      STARS.forEach((_, i) => {
        gsap.to(`.rd-star-${i}`, {
          opacity: 0.2 + Math.random() * 0.6,
          duration: 1.4 + Math.random() * 1.2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="ready"
      ref={root}
      className="relative w-full overflow-hidden bg-forest-deep"
      style={{ height: '100vh' }}
    >
      {/* Sky */}
      <div
        ref={skyRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #0b1119 0%, #1b1520 15%, #3a1a24 32%, #6f2f22 48%, #b4682a 62%, #dfa958 74%, #f5c98a 85%, #f5efe4 100%)',
        }}
      />

      {/* Stars */}
      <div ref={starsRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
        {STARS.map((p, i) => (
          <span
            key={i}
            className={`rd-star rd-star-${i} absolute rounded-full bg-cream`}
            style={{
              left: `${p.x}%`,
              top: `${p.y * 0.5}%`,
              width: i % 4 === 0 ? '2px' : '1px',
              height: i % 4 === 0 ? '2px' : '1px',
            }}
          />
        ))}
      </div>

      {/* Warm ambient glow at horizon */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-x-0"
        style={{
          bottom: '18%',
          height: '58%',
          background:
            'radial-gradient(ellipse 95% 65% at 50% 100%, rgba(255,220,155,0.7) 0%, rgba(255,175,90,0.35) 35%, rgba(200,80,40,0.15) 60%, transparent 80%)',
        }}
      />

      {/* Sun rays */}
      <svg
        ref={raysRef}
        className="pointer-events-none absolute left-1/2"
        style={{
          bottom: '20%',
          transform: 'translate(-50%, 50%)',
          width: 'min(60rem, 130vw)',
          height: 'min(60rem, 130vw)',
        }}
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        {RAYS.map((r, i) => (
          <line
            key={i}
            x1="200"
            y1="200"
            x2="200"
            y2={r.short ? '30' : '0'}
            transform={`rotate(${r.angle} 200 200)`}
            stroke="rgba(255,220,160,0.35)"
            strokeWidth={i % 3 === 0 ? '1.5' : '0.75'}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Sun disc */}
      <div
        ref={sunRef}
        className="pointer-events-none absolute left-1/2 rounded-full"
        style={{
          bottom: '20%',
          width: 'min(28rem, 80vw)',
          height: 'min(28rem, 80vw)',
          transform: 'translate(-50%, 50%)',
          background:
            'radial-gradient(circle, rgba(255,245,215,1) 0%, rgba(255,215,145,0.95) 30%, rgba(230,150,70,0.5) 55%, rgba(230,150,70,0) 74%)',
          filter: 'blur(0.5px)',
        }}
      />

      {/* Single coherent mountain ridge */}
      <svg
        ref={mountainsRef}
        viewBox="0 0 1000 260"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
        style={{ height: '28%' }}
      >
        <path
          d="M 0 260 L 0 130 Q 80 100 160 118 T 320 108 T 480 128 T 640 100 T 800 122 T 1000 108 L 1000 260 Z"
          fill="#1a2620"
          opacity="0.55"
        />
        <path
          d="M 0 260 L 0 160 Q 100 135 200 150 T 380 140 T 560 158 T 740 130 T 920 152 T 1000 140 L 1000 260 Z"
          fill="#0f1b12"
          opacity="0.85"
        />
        <path
          d="M 0 260 L 0 195 Q 90 175 180 190 T 360 182 T 540 200 T 720 175 T 900 195 T 1000 185 L 1000 260 Z"
          fill="#050e07"
        />
      </svg>

      {/* Mist band */}
      <div
        ref={mistRef}
        className="pointer-events-none absolute inset-x-0"
        style={{
          bottom: '28%',
          height: '5rem',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(245,239,228,0.45) 50%, transparent 100%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Bird flocks */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {FLOCKS.map((flock, fi) => (
          <div
            key={fi}
            className={`rd-flock rd-flock-${fi} absolute`}
            style={{ top: `${flock.y}%`, left: 0, width: 'auto', height: `${flock.size}px` }}
          >
            {Array.from({ length: flock.birds }).map((_, bi) => (
              <svg
                key={bi}
                className="rd-bird absolute"
                style={{
                  left: `${bi * 28}px`,
                  top: `${(bi % 3) * 3}px`,
                  width: `${flock.size + 2}px`,
                  height: `${flock.size / 2 + 2}px`,
                  color: '#0a1509',
                }}
                viewBox="0 0 20 10"
              >
                <path
                  d="M 1 8 Q 5 2 10 6 Q 15 2 19 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
        ))}
      </div>

      {/* Ember particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`rd-particle rd-particle-${i} absolute rounded-full`}
            style={{
              left: `${p.x}%`,
              top: `${45 + p.y * 0.4}%`,
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              background: 'rgba(255,220,160,0.9)',
              boxShadow: '0 0 5px rgba(255,200,120,0.7)',
            }}
          />
        ))}
      </div>

      {/* Text — vertically centered, cream, always visible */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <span
          ref={eyebrowRef}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-cream/85"
          style={{ textShadow: '0 0 10px rgba(20,15,10,0.6)' }}
        >
          {t('contact.eyebrow')}
        </span>
        <h2
          ref={headlineRef}
          className="serif text-cream"
          style={{
            fontSize: 'clamp(4rem, 14vw, 11rem)',
            lineHeight: '0.92',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 30px rgba(30,15,5,0.55), 0 0 40px rgba(255,200,120,0.35)',
          }}
        >
          {t('ready.headline')}
        </h2>
        <p
          ref={bodyRef}
          className="mt-8 max-w-2xl text-base leading-relaxed text-cream/95 md:text-lg"
          style={{ textShadow: '0 2px 12px rgba(20,15,10,0.7)' }}
        >
          {t('ready.body')}
        </p>
      </div>
    </section>
  )
}

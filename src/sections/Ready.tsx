import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion, splitWordsIntoLetters } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const BIRDS = [
  { x: 12, delay: 0 },
  { x: 22, delay: 0.15 },
  { x: 34, delay: 0.05 },
  { x: 52, delay: 0.22 },
  { x: 66, delay: 0.1 },
  { x: 78, delay: 0.18 },
  { x: 90, delay: 0.28 },
]

export default function Ready() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mistRef = useRef<HTMLDivElement>(null)
  const horizonRef = useRef<SVGSVGElement>(null)
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
            skyRef.current,
            glowRef.current,
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

      gsap.set(skyRef.current, { opacity: 0 })
      gsap.set(glowRef.current, { opacity: 0 })
      gsap.set(sunRef.current, { y: 260, opacity: 0 })
      gsap.set(horizonRef.current, { opacity: 0, y: 20 })
      gsap.set(mistRef.current, { opacity: 0, y: 20 })
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

      tl.to(skyRef.current, { opacity: 1, duration: 0.3 }, 0)
      tl.to(glowRef.current, { opacity: 1, duration: 0.35 }, 0.05)
      tl.to(horizonRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.15)
      tl.to(sunRef.current, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.25)
      tl.to(mistRef.current, { opacity: 0.55, y: 0, duration: 0.4 }, 0.4)
      tl.to(
        '.rd-letter',
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out' },
        0.55,
      )
      tl.to(
        '.rd-bird',
        { opacity: 0.85, x: 0, duration: 0.7, stagger: 0.09, ease: 'power2.out' },
        0.7,
      )
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.85)

      gsap.to(sunRef.current, {
        scale: 1.04,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to(mistRef.current, {
        x: 25,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      BIRDS.forEach((b, i) => {
        gsap.to(`.rd-bird-${i}`, {
          y: '+=6',
          duration: 1.5 + b.delay * 1.5,
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
      className="relative w-full overflow-hidden bg-forest-deep text-forest-deep"
      style={{ minHeight: '340vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Sky — deep at top, warm ochre mid, cream near horizon */}
        <div
          ref={skyRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #122015 0%, #2a2418 22%, #5e3f24 45%, #a8712f 65%, #dfa958 78%, #f5c98a 88%, #f5efe4 100%)',
          }}
        />

        {/* Warm ambient glow at horizon */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-x-0"
          style={{
            bottom: '20%',
            height: '55%',
            background:
              'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,230,170,0.55) 0%, rgba(255,180,100,0.25) 40%, transparent 75%)',
          }}
        />

        {/* Sun disc — rises to sit just above horizon */}
        <div
          ref={sunRef}
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            bottom: '30%',
            width: '30rem',
            height: '30rem',
            background:
              'radial-gradient(circle, rgba(255,240,200,0.95) 0%, rgba(255,205,130,0.75) 25%, rgba(210,140,60,0.35) 50%, rgba(210,140,60,0) 72%)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* Horizon silhouette — dark forest ridge */}
        <svg
          ref={horizonRef}
          viewBox="0 0 1000 240"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full"
        >
          <path
            d="M 0 240 L 0 130 Q 60 90 120 105 T 240 95 T 360 115 T 480 80 T 600 100 T 720 90 T 840 110 T 1000 95 L 1000 240 Z"
            fill="#122015"
          />
          <path
            d="M 0 240 L 0 175 Q 80 155 160 165 T 320 155 T 480 170 T 640 145 T 800 160 T 1000 150 L 1000 240 Z"
            fill="#0a1509"
            fillOpacity="0.85"
          />
        </svg>

        {/* Drifting mist band */}
        <div
          ref={mistRef}
          className="pointer-events-none absolute inset-x-0"
          style={{
            bottom: '32%',
            height: '4rem',
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(245,239,228,0.4) 50%, transparent 100%)',
            filter: 'blur(6px)',
          }}
        />

        {/* Birds — flying across just above horizon */}
        <div className="pointer-events-none absolute inset-x-0" style={{ bottom: '46%', height: '3rem' }}>
          {BIRDS.map((b, i) => (
            <svg
              key={i}
              className={`rd-bird rd-bird-${i} absolute`}
              style={{
                left: `${b.x}%`,
                top: `${(i % 3) * 12}px`,
                width: `${28 + (i % 3) * 6}px`,
                height: `${14 + (i % 3) * 3}px`,
                color: '#122015',
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

        {/* Text — sits above the sun, always centered */}
        <div
          className="absolute inset-x-0 flex flex-col items-center text-center"
          style={{ top: '18%' }}
        >
          <h2 className="serif beat-text px-6 text-7xl leading-[0.9] md:text-8xl lg:text-9xl xl:text-[10rem]">
            {wordLetters.map((word, wi) => (
              <span key={wi} className="mr-[0.28em] inline-block whitespace-nowrap last:mr-0">
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
            className="beat-text mt-8 max-w-2xl px-6 text-base leading-relaxed text-forest-deep/90 md:text-lg"
          >
            {t('ready.body')}
          </p>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

// Posters pinned to a bulletin board. First one is the "featured" campaign
// — slightly bigger, warmer color, subtle tilt.
const POSTERS = [
  { x: 220, y: 90, w: 130, h: 170, rotate: -4, tone: 'featured' },
  { x: 60, y: 60, w: 100, h: 130, rotate: 6, tone: 'plain' },
  { x: 370, y: 70, w: 110, h: 140, rotate: -8, tone: 'plain' },
  { x: 40, y: 220, w: 110, h: 130, rotate: 3, tone: 'plain' },
  { x: 200, y: 280, w: 100, h: 90, rotate: 5, tone: 'plain' },
  { x: 360, y: 240, w: 120, h: 130, rotate: -3, tone: 'plain' },
]

export default function WorkStudentUnion() {
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
          [eyebrowRef.current, headlineRef.current, bodyRef.current, '.br-board', '.br-poster'],
          { opacity: 1 },
        )
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.br-board', { opacity: 0, scale: 0.94, transformOrigin: 'center' })
      gsap.set('.br-poster', { opacity: 0, y: -20, scale: 0.9, transformOrigin: 'center top' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.75, duration: 0.05 }, 0)
      tl.to('.br-board', { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }, 0.05)
      tl.to(
        '.br-poster',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: { each: 0.06, from: 'start' },
          ease: 'back.out(1.5)',
        },
        0.2,
      )
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.6)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.78)

      // Idle: posters sway subtly like paper in a breeze; featured breathes more
      POSTERS.forEach((_, i) => {
        gsap.to(`.br-poster-${i}`, {
          rotate: `+=${(i % 2 === 0 ? 1 : -1) * 1.5}`,
          duration: 3 + (i % 3) * 0.6,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          transformOrigin: `${POSTERS[i].x + POSTERS[i].w / 2}px ${POSTERS[i].y + 10}px`,
        })
      })
      gsap.to('.br-poster-0', {
        scale: 1.02,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="work-student-union"
      ref={root}
      className="relative w-full bg-forest text-cream"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-20 md:px-16 md:py-24 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('workStudentUnion.eyebrow')}
          </span>
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-10 lg:gap-12">
          <svg
            viewBox="0 0 540 420"
            aria-hidden="true"
            className="h-64 w-full max-w-2xl md:h-80 lg:h-96"
          >
            {/* Corkboard */}
            <rect
              className="br-board"
              x="10"
              y="10"
              width="520"
              height="400"
              rx="6"
              fill="#3d3524"
              stroke="#5a4c2e"
              strokeWidth="6"
            />
            <rect
              className="br-board"
              x="10"
              y="10"
              width="520"
              height="400"
              rx="6"
              fill="url(#br-cork-noise)"
              opacity="0.15"
            />

            <defs>
              <pattern id="br-cork-noise" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#3d3524" />
                <circle cx="2" cy="3" r="0.5" fill="#5a4c2e" opacity="0.6" />
                <circle cx="6" cy="6" r="0.4" fill="#7a6a44" opacity="0.5" />
              </pattern>
            </defs>

            {/* Posters */}
            {POSTERS.map((p, i) => {
              const isFeatured = p.tone === 'featured'
              const bg = isFeatured ? '#c68b3c' : '#f5efe4'
              const stroke = isFeatured ? '#8a5a2a' : '#d9d0bd'
              const line = isFeatured ? '#5a3a1a' : '#7a7060'
              return (
                <g
                  key={i}
                  className={`br-poster br-poster-${i}`}
                  transform={`translate(${p.x} ${p.y}) rotate(${p.rotate} ${p.w / 2} ${p.h / 2})`}
                >
                  <rect
                    width={p.w}
                    height={p.h}
                    rx="2"
                    fill={bg}
                    stroke={stroke}
                    strokeWidth="1"
                    style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))' }}
                  />
                  {/* Title bar */}
                  <rect x="10" y="14" width={p.w - 20} height="10" fill={line} opacity="0.7" />
                  {/* Text lines */}
                  <rect x="10" y="34" width={p.w - 30} height="3" fill={line} opacity="0.45" />
                  <rect x="10" y="42" width={p.w - 40} height="3" fill={line} opacity="0.45" />
                  <rect x="10" y="50" width={p.w - 25} height="3" fill={line} opacity="0.45" />
                  {/* Image placeholder */}
                  <rect
                    x="10"
                    y={p.h - 55}
                    width={p.w - 20}
                    height="35"
                    fill={line}
                    opacity="0.2"
                  />
                  {/* Pin */}
                  <circle cx={p.w / 2} cy="8" r="5" fill="#c62828" stroke="#7a1414" strokeWidth="0.75" />
                  <circle cx={p.w / 2 - 1.5} cy="6" r="1.5" fill="#ffb0b0" opacity="0.8" />
                </g>
              )
            })}
          </svg>

          <div className="flex flex-col items-center gap-6 text-center">
            <h2
              ref={headlineRef}
              className="serif beat-text max-w-3xl text-3xl leading-[1.1] md:text-4xl lg:text-5xl"
            >
              {t('workStudentUnion.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('workStudentUnion.body')}
            </p>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

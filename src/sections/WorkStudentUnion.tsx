import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const RIPPLES = [60, 110, 160, 210]
const CARDS = [
  { angle: -60, distance: 130 },
  { angle: -20, distance: 165 },
  { angle: 25, distance: 145 },
  { angle: 70, distance: 175 },
  { angle: 130, distance: 155 },
  { angle: 200, distance: 170 },
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
        gsap.set(['.rs-center', '.rs-ripple', '.rs-card', eyebrowRef.current, headlineRef.current, bodyRef.current], {
          opacity: 1,
        })
        gsap.set('.rs-ripple', { scale: 1 })
        gsap.set('.rs-card', { scale: 1 })
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set('.rs-center', { opacity: 0, scale: 0, transformOrigin: 'center' })
      gsap.set('.rs-ripple', { opacity: 0, scale: 0.2, transformOrigin: 'center' })
      gsap.set('.rs-card', { opacity: 0, scale: 0.5, transformOrigin: 'center' })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.7, duration: 0.05 }, 0)
      tl.to('.rs-center', { opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(2)' }, 0.05)
      tl.to(
        '.rs-ripple',
        {
          opacity: (i) => 0.5 - i * 0.1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        },
        0.15,
      )
      tl.to(
        '.rs-card',
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.05,
          ease: 'back.out(1.5)',
        },
        0.4,
      )
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.6)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.78)

      gsap.to('.rs-center', {
        scale: 1.35,
        opacity: 0.9,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.rs-ripple', {
        scale: 1.06,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.3, from: 'center' },
        transformOrigin: 'center',
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
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('workStudentUnion.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">03 / 10</span>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <svg
            viewBox="0 0 500 500"
            aria-hidden="true"
            className="mx-auto h-[22rem] w-[22rem] text-cream md:h-[26rem] md:w-[26rem]"
          >
            {RIPPLES.map((r, i) => (
              <circle
                key={`r${i}`}
                className="rs-ripple"
                cx="250"
                cy="250"
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              />
            ))}
            {CARDS.map((c, i) => {
              const rad = (c.angle * Math.PI) / 180
              const x = 250 + Math.cos(rad) * c.distance
              const y = 250 + Math.sin(rad) * c.distance
              return (
                <g
                  key={`c${i}`}
                  className="rs-card"
                  transform={`translate(${x - 22} ${y - 14}) rotate(${c.angle + 90} 22 14)`}
                >
                  <rect width="44" height="28" rx="2" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="6" y1="10" x2="38" y2="10" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.75" />
                  <line x1="6" y1="16" x2="30" y2="16" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.75" />
                  <line x1="6" y1="22" x2="34" y2="22" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.75" />
                </g>
              )
            })}
            <circle className="rs-center" cx="250" cy="250" r="10" fill="currentColor" />
          </svg>

          <div className="flex flex-col gap-6">
            <h2
              ref={headlineRef}
              className="serif beat-text text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
            >
              {t('workStudentUnion.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="beat-text max-w-xl text-base leading-relaxed md:text-lg"
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

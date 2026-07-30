import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const BRANCHES = [
  { d: 'M 200 340 Q 150 300 110 270', tip: { x: 110, y: 270 } },
  { d: 'M 200 310 Q 250 275 290 245', tip: { x: 290, y: 245 } },
  { d: 'M 200 270 Q 155 235 115 205', tip: { x: 115, y: 205 } },
  { d: 'M 200 240 Q 245 205 280 170', tip: { x: 280, y: 170 } },
  { d: 'M 200 200 Q 160 165 130 130', tip: { x: 130, y: 130 } },
  { d: 'M 200 170 Q 240 135 265 100', tip: { x: 265, y: 100 } },
]

export default function Learning() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const trunkRef = useRef<SVGLineElement>(null)
  const canopyRef = useRef<SVGCircleElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([eyebrowRef.current, headlineRef.current, bodyRef.current, '.lr-branch', '.lr-leaf', canopyRef.current], { opacity: 1 })
        gsap.set(trunkRef.current, { attr: { y1: 380, y2: 120 } })
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set(trunkRef.current, { attr: { y2: 380 } })

      const branches = document.querySelectorAll<SVGPathElement>('.lr-branch')
      branches.forEach((b) => {
        const len = b.getTotalLength()
        b.style.strokeDasharray = `${len}`
        b.style.strokeDashoffset = `${len}`
      })
      gsap.set('.lr-leaf', { opacity: 0, scale: 0, transformOrigin: 'center' })
      gsap.set(canopyRef.current, { opacity: 0, scale: 0, transformOrigin: '200px 90px' })
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
      tl.to(trunkRef.current, { attr: { y2: 120 }, duration: 0.35, ease: 'power1.out' }, 0.05)
      tl.to(
        branches,
        {
          strokeDashoffset: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: 'power1.out',
        },
        0.2,
      )
      tl.to(
        '.lr-leaf',
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          stagger: 0.04,
          ease: 'back.out(1.8)',
        },
        0.4,
      )
      tl.to(canopyRef.current, { opacity: 0.18, scale: 1, duration: 0.4 }, 0.55)
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.65)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.82)
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="learning"
      ref={root}
      className="relative w-full bg-cream text-forest-deep"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('learning.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">07 / 10</span>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <svg
            viewBox="0 0 400 400"
            aria-hidden="true"
            className="mx-auto h-80 w-80 text-forest md:h-96 md:w-96"
          >
            <circle
              ref={canopyRef}
              cx="200"
              cy="150"
              r="150"
              fill="currentColor"
            />
            <line
              ref={trunkRef}
              x1="200"
              y1="380"
              x2="200"
              y2="380"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {BRANCHES.map((b, i) => (
              <path
                key={`b${i}`}
                className="lr-branch"
                d={b.d}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ))}
            {BRANCHES.map((b, i) => (
              <circle
                key={`l${i}`}
                className="lr-leaf"
                cx={b.tip.x}
                cy={b.tip.y}
                r="6"
                fill="currentColor"
              />
            ))}
          </svg>

          <div className="flex flex-col gap-6">
            <h2
              ref={headlineRef}
              className="serif beat-text text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
            >
              {t('learning.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="beat-text max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('learning.body')}
            </p>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

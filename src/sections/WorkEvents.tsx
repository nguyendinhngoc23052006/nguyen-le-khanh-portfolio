import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const PEOPLE = [
  { x: 90, y: 90 },
  { x: 150, y: 90 },
  { x: 210, y: 90 },
  { x: 90, y: 150 },
  { x: 150, y: 150 },
  { x: 210, y: 150 },
  { x: 90, y: 210 },
  { x: 150, y: 210 },
  { x: 210, y: 210 },
  { x: 60, y: 260 },
  { x: 240, y: 260 },
]

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
        gsap.set(['.we-grid', '.we-venue', '.we-stage', '.we-person', eyebrowRef.current, headlineRef.current, bodyRef.current], {
          opacity: 1,
        })
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set('.we-grid', { opacity: 0 })
      gsap.set('.we-venue', { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 })
      gsap.set('.we-stage', { opacity: 0, scaleY: 0, transformOrigin: 'center bottom' })
      gsap.set('.we-person', { opacity: 0, scale: 0, transformOrigin: 'center' })
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
      tl.to('.we-grid', { opacity: 0.15, duration: 0.15 }, 0.05)
      tl.to('.we-venue', { opacity: 0.6, strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 0.15)
      tl.to('.we-stage', { opacity: 0.5, scaleY: 1, duration: 0.2 }, 0.35)
      tl.to(
        '.we-person',
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          stagger: { each: 0.03, from: 'random' },
          ease: 'back.out(1.6)',
        },
        0.45,
      )
      tl.to('.we-grid', { opacity: 0.05, duration: 0.15 }, 0.7)
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.65)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.82)

      // Idle: attendees breathe, stage glows
      gsap.to('.we-person', {
        scale: 1.1,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center',
        stagger: { each: 0.08, from: 'random' },
      })
      gsap.to('.we-stage', {
        opacity: 0.75,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const gridLines: number[] = []
  for (let i = 0; i <= 30; i += 1) gridLines.push(i * 10)

  return (
    <section
      id="work-events"
      ref={root}
      className="relative w-full bg-forest text-cream"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('workEvents.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">05 / 10</span>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <svg
            viewBox="0 0 300 300"
            aria-hidden="true"
            className="mx-auto h-80 w-80 text-cream md:h-96 md:w-96"
          >
            <g className="we-grid">
              {gridLines.map((v) => (
                <line key={`gv${v}`} x1={v} y1="0" x2={v} y2="300" stroke="currentColor" strokeWidth="0.5" />
              ))}
              {gridLines.map((v) => (
                <line key={`gh${v}`} x1="0" y1={v} x2="300" y2={v} stroke="currentColor" strokeWidth="0.5" />
              ))}
            </g>
            <rect
              className="we-venue"
              x="30"
              y="50"
              width="240"
              height="220"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <rect
              className="we-stage"
              x="90"
              y="40"
              width="120"
              height="12"
              fill="currentColor"
              opacity="0.5"
            />
            {PEOPLE.map((p, i) => (
              <g key={i} className="we-person" transform={`translate(${p.x} ${p.y})`}>
                <circle cx="0" cy="-6" r="3" fill="currentColor" />
                <path d="M -5 8 Q 0 -2 5 8 Z" fill="currentColor" opacity="0.85" />
              </g>
            ))}
          </svg>

          <div className="flex flex-col gap-6">
            <h2
              ref={headlineRef}
              className="serif beat-text text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
            >
              {t('workEvents.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="beat-text max-w-xl text-base leading-relaxed md:text-lg"
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

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion, dotsOnRing } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const RING = dotsOnRing(8, 130, 200, 200)

export default function Belief() {
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
        gsap.set(['.b-dot', '.b-line', '.b-center', eyebrowRef.current, headlineRef.current, bodyRef.current], {
          opacity: 1,
        })
        gsap.set('.b-dot', { scale: 1 })
        gsap.set('.b-line', { drawSVG: 1 })
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set('.b-center', { opacity: 0, scale: 0 })
      gsap.set('.b-dot', { opacity: 0, scale: 0, transformOrigin: 'center' })
      gsap.set('.b-line', { opacity: 0, scaleX: 0, transformOrigin: '200px 200px' })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })

      const lines = document.querySelectorAll<SVGLineElement>('.b-line')
      lines.forEach((line) => {
        const x2 = Number(line.getAttribute('x2'))
        const y2 = Number(line.getAttribute('y2'))
        const dx = x2 - 200
        const dy = y2 - 200
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        gsap.set(line, {
          transformOrigin: '200px 200px',
          rotate: 0,
          attr: { x2: 200, y2: 200 },
        })
        line.dataset.tx = String(x2)
        line.dataset.ty = String(y2)
        line.dataset.angle = String(angle)
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.7, duration: 0.05 }, 0)
      tl.to('.b-center', { opacity: 1, scale: 1, duration: 0.15, ease: 'back.out(2)' }, 0.05)
      tl.to(
        '.b-dot',
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          stagger: { each: 0.03, from: 'start' },
          ease: 'back.out(1.8)',
        },
        0.15,
      )
      lines.forEach((line, i) => {
        tl.to(
          line,
          {
            opacity: 0.4,
            attr: {
              x2: Number(line.dataset.tx),
              y2: Number(line.dataset.ty),
            },
            duration: 0.3,
            ease: 'power2.out',
          },
          0.35 + i * 0.02,
        )
      })
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.55)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.75)

      gsap.to('.b-dot', {
        scale: 1.15,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.15, from: 'random' },
      })
      gsap.to('.b-center', {
        scale: 1.2,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.b-line', {
        opacity: 0.7,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.12, from: 'random' },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="belief"
      ref={root}
      className="relative w-full bg-cream text-forest-deep"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('belief.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">02 / 10</span>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <svg
            viewBox="0 0 400 400"
            aria-hidden="true"
            className="mx-auto h-80 w-80 text-forest md:h-96 md:w-96"
          >
            {RING.map((p, i) => (
              <line
                key={`l${i}`}
                className="b-line"
                x1="200"
                y1="200"
                x2={p.x}
                y2={p.y}
                stroke="currentColor"
                strokeWidth="0.75"
              />
            ))}
            <circle className="b-center" cx="200" cy="200" r="6" fill="currentColor" />
            {RING.map((p, i) => (
              <circle
                key={`d${i}`}
                className="b-dot"
                cx={p.x}
                cy={p.y}
                r="4"
                fill="currentColor"
              />
            ))}
          </svg>

          <div className="flex flex-col gap-6">
            <h2
              ref={headlineRef}
              className="serif beat-text text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
            >
              {t('belief.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="beat-text max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('belief.body')}
            </p>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

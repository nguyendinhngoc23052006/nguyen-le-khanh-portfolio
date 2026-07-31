import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = 'nglekhanh2507@gmail.com'

export default function Contact() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const flapRef = useRef<SVGPathElement>(null)
  const bodyRectRef = useRef<SVGRectElement>(null)
  const linesRef = useRef<SVGGElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([eyebrowRef.current, headlineRef.current, bodyRef.current, emailRef.current, flapRef.current, bodyRectRef.current, linesRef.current], { opacity: 1 })
        gsap.set(flapRef.current, { rotationX: 0 })
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set(bodyRectRef.current, { opacity: 0, y: 10 })
      gsap.set(flapRef.current, { opacity: 0, transformOrigin: '250px 100px' })
      gsap.set(linesRef.current, { opacity: 0 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set(emailRef.current, { opacity: 0, y: 20 })
      gsap.set('.ct-line', { scaleX: 0, transformOrigin: 'left center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.7, duration: 0.05 }, 0)
      tl.to(bodyRectRef.current, { opacity: 1, y: 0, duration: 0.2 }, 0.05)
      tl.to(flapRef.current, { opacity: 1, duration: 0.05 }, 0.2)
      tl.fromTo(flapRef.current, { attr: { d: 'M 100 100 L 400 100 L 250 100 Z' } }, {
        attr: { d: 'M 100 100 L 400 100 L 250 220 Z' },
        duration: 0.35,
        ease: 'power2.out',
      }, 0.22)
      tl.to(linesRef.current, { opacity: 1, duration: 0.15 }, 0.45)
      tl.to('.ct-line', { scaleX: 1, duration: 0.3, stagger: 0.08, ease: 'power2.out' }, 0.45)
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.6)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.2 }, 0.75)
      tl.to(emailRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.85)

      // Idle: envelope breathes gently
      gsap.to(bodyRectRef.current, {
        scale: 1.015,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center',
      })
      gsap.to(emailRef.current, {
        opacity: 0.75,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="contact"
      ref={root}
      className="relative w-full bg-forest-deep text-cream"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('contact.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">10 / 10</span>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <svg
            viewBox="0 0 500 320"
            aria-hidden="true"
            className="mx-auto h-64 w-full max-w-md text-cream md:h-80"
          >
            <rect
              ref={bodyRectRef}
              x="100"
              y="100"
              width="300"
              height="140"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <path
              ref={flapRef}
              d="M 100 100 L 400 100 L 250 220 Z"
              fill="rgba(245,239,228,0.05)"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
            <g ref={linesRef}>
              <line className="ct-line" x1="130" y1="160" x2="370" y2="160" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.75" />
              <line className="ct-line" x1="130" y1="180" x2="340" y2="180" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.75" />
              <line className="ct-line" x1="130" y1="200" x2="360" y2="200" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.75" />
            </g>
          </svg>

          <div className="flex flex-col gap-6">
            <h2
              ref={headlineRef}
              className="serif beat-text text-3xl leading-[1.1] md:text-4xl lg:text-5xl"
            >
              {t('contact.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="beat-text max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('contact.body')}
            </p>
            <a
              ref={emailRef}
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(t('contact.subject'))}`}
              className="serif inline-block w-fit border-b border-cream pb-1 text-2xl italic transition hover:text-ochre hover:opacity-90 md:text-3xl"
              style={{ textShadow: '0 0 20px rgba(198,139,60,0.35)' }}
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

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
  const envelopeRef = useRef<SVGGElement>(null)
  const flapRef = useRef<SVGPathElement>(null)
  const letterRef = useRef<SVGGElement>(null)
  const sealRef = useRef<SVGGElement>(null)
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
            emailRef.current,
            envelopeRef.current,
            flapRef.current,
            letterRef.current,
            sealRef.current,
            '.ct-letter-line',
          ],
          { opacity: 1 },
        )
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set(envelopeRef.current, { opacity: 0, y: 20 })
      gsap.set(flapRef.current, { opacity: 0 })
      gsap.set(sealRef.current, { opacity: 0, scale: 0, transformOrigin: 'center' })
      gsap.set(letterRef.current, { opacity: 0, y: 40 })
      gsap.set('.ct-letter-line', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set(emailRef.current, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.75, duration: 0.05 }, 0)
      tl.to(envelopeRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.05)
      tl.to(flapRef.current, { opacity: 1, duration: 0.05 }, 0.15)
      tl.fromTo(
        flapRef.current,
        { attr: { d: 'M 60 100 L 340 100 L 200 100 Z' } },
        {
          attr: { d: 'M 60 100 L 340 100 L 200 210 Z' },
          duration: 0.3,
          ease: 'power2.out',
        },
        0.17,
      )
      tl.to(sealRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)' }, 0.35)
      tl.to(letterRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.42)
      tl.to(
        '.ct-letter-line',
        { scaleX: 1, duration: 0.25, stagger: 0.08, ease: 'power2.out' },
        0.5,
      )
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.62)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.78)
      tl.to(emailRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.86)

      // Idle: letter breathes, seal glows
      gsap.to(letterRef.current, {
        y: '-=4',
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to(sealRef.current, {
        scale: 1.06,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center',
      })
      gsap.to(emailRef.current, {
        opacity: 0.8,
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
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-20 md:px-16 md:py-24 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('contact.eyebrow')}
          </span>
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-10 lg:gap-12">
          <svg
            viewBox="0 0 400 340"
            aria-hidden="true"
            className="h-56 w-full max-w-md md:h-64 lg:h-72"
          >
            {/* Envelope body */}
            <g ref={envelopeRef}>
              <rect
                x="60"
                y="100"
                width="280"
                height="180"
                rx="3"
                fill="#0a1509"
                stroke="#cbb894"
                strokeWidth="1.5"
              />
              {/* Body fold lines */}
              <path d="M 60 280 L 200 200 L 340 280" fill="none" stroke="#cbb894" strokeWidth="1" opacity="0.5" />
            </g>

            {/* Letter behind flap, slides up out */}
            <g ref={letterRef} transform="translate(0 0)">
              <rect
                x="80"
                y="115"
                width="240"
                height="140"
                rx="2"
                fill="#f5efe4"
                stroke="#c9c0a8"
                strokeWidth="0.75"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.35))' }}
              />
              {/* Letter text lines */}
              <line className="ct-letter-line" x1="100" y1="140" x2="240" y2="140" stroke="#3a2f1c" strokeWidth="1.5" strokeLinecap="round" />
              <line className="ct-letter-line" x1="100" y1="158" x2="270" y2="158" stroke="#3a2f1c" strokeWidth="1.5" strokeLinecap="round" />
              <line className="ct-letter-line" x1="100" y1="176" x2="220" y2="176" stroke="#3a2f1c" strokeWidth="1.5" strokeLinecap="round" />
              <line className="ct-letter-line" x1="100" y1="194" x2="255" y2="194" stroke="#3a2f1c" strokeWidth="1.5" strokeLinecap="round" />
              <line className="ct-letter-line" x1="100" y1="222" x2="180" y2="222" stroke="#5a3a1a" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Envelope flap (drawn on top so it overlaps the letter until it opens) */}
            <path
              ref={flapRef}
              d="M 60 100 L 340 100 L 200 210 Z"
              fill="#132217"
              stroke="#cbb894"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Broken wax seal (fragment beside the envelope) */}
            <g ref={sealRef} transform="translate(350 175) rotate(-15)">
              <circle cx="0" cy="0" r="14" fill="#8b2c1a" stroke="#5c1a10" strokeWidth="1" />
              <path d="M -10 -3 L 10 6 L 6 -10 L -6 8 Z" fill="none" stroke="#3a0a04" strokeWidth="1" opacity="0.6" />
              <path d="M -14 8 L -8 3" stroke="#8b2c1a" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>

          <div className="flex flex-col items-center gap-6 text-center">
            <h2
              ref={headlineRef}
              className="serif beat-text max-w-3xl text-3xl leading-[1.1] md:text-4xl lg:text-5xl"
            >
              {t('contact.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('contact.body')}
            </p>
            <a
              ref={emailRef}
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(t('contact.subject'))}`}
              className="serif mt-2 inline-block w-fit border-b border-cream pb-1 text-2xl italic transition hover:text-ochre hover:opacity-90 md:text-3xl"
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

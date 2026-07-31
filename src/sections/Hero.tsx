import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion, splitWordsIntoLetters, randomPoints } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const FIREFLIES = randomPoints(18, 42)

export default function Hero() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const horizonRef = useRef<SVGPathElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([(nameRef.current?.querySelectorAll('.letter') ?? []), taglineRef.current, eyebrowRef.current], {
          opacity: 1,
          y: 0,
        })
        if (horizonRef.current) {
          const len = horizonRef.current.getTotalLength()
          horizonRef.current.style.strokeDasharray = `${len}`
          horizonRef.current.style.strokeDashoffset = '0'
        }
        return
      }

      const letters = (nameRef.current?.querySelectorAll('.letter') ?? [])
      gsap.set(letters, { opacity: 0, y: 60 })
      gsap.set(taglineRef.current, { opacity: 0, y: 30 })
      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set('.firefly', { opacity: 0, scale: 0 })

      if (horizonRef.current) {
        const len = horizonRef.current.getTotalLength()
        horizonRef.current.style.strokeDasharray = `${len}`
        horizonRef.current.style.strokeDashoffset = `${len}`
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.7, duration: 0.05 }, 0)
      tl.to(
        letters,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.025, ease: 'power2.out' },
        0.02,
      )
      tl.to(
        horizonRef.current,
        { strokeDashoffset: 0, duration: 0.6, ease: 'power1.inOut' },
        0.15,
      )
      tl.to(
        '.firefly',
        { opacity: 0.9, scale: 1, duration: 0.5, stagger: { amount: 0.4, from: 'random' } },
        0.2,
      )
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.35)
      tl.to(cueRef.current, { opacity: 0, duration: 0.2 }, 0.6)

      gsap.to('.firefly', {
        y: '+=6',
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.15, from: 'random' },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced, t])

  const nameText = t('hero.name')
  const wordLetters = splitWordsIntoLetters(nameText)

  return (
    <section
      id="hero"
      ref={root}
      className="relative w-full bg-forest-deep text-cream"
      style={{ minHeight: '250vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-16 md:px-16 lg:px-24">
        {/* Aurora nebula wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(60,90,70,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 75% 60%, rgba(120,80,50,0.28) 0%, transparent 60%)',
          }}
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <path
            ref={horizonRef}
            d="M -20 780 Q 250 720 500 760 T 1020 740"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        </svg>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {FIREFLIES.map((p, i) => (
            <span
              key={i}
              className="firefly absolute h-1 w-1 rounded-full bg-ochre"
              style={{
                left: `${p.x}%`,
                top: `${25 + p.y * 0.5}%`,
                boxShadow: '0 0 6px 1px rgba(198,139,60,0.6)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 pt-20">
          <span
            ref={eyebrowRef}
            className="text-xs uppercase tracking-[0.3em]"
          >
            {t('hero.eyebrow')}
          </span>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 pb-16">
          <h1
            ref={nameRef}
            className="serif beat-text text-6xl leading-[0.95] md:text-8xl lg:text-[10rem]"
          >
            {wordLetters.map((word, wi) => (
              <span
                key={wi}
                className="mr-[0.28em] inline-block whitespace-nowrap last:mr-0"
              >
                {word.map((ch, li) => (
                  <span key={li} className="letter inline-block">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p
            ref={taglineRef}
            className="serif beat-text max-w-3xl text-2xl italic leading-snug md:text-4xl"
          >
            {t('hero.tagline')}
          </p>
        </div>

        <div ref={cueRef} className="relative z-10 flex items-end justify-between">
          <p className="max-w-xl text-xs uppercase tracking-widest opacity-70">
            {t('hero.scrollCue')}
          </p>
          <span aria-hidden="true" className="text-xs opacity-70">↓</span>
        </div>
      </div>
    </section>
  )
}

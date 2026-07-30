import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const PEOPLE = [
  { start: { x: 30, y: 60 }, end: { x: 165, y: 130 } },
  { start: { x: 380, y: 40 }, end: { x: 245, y: 140 } },
  { start: { x: 410, y: 240 }, end: { x: 265, y: 220 } },
  { start: { x: 40, y: 300 }, end: { x: 170, y: 250 } },
  { start: { x: 200, y: 380 }, end: { x: 200, y: 265 } },
  { start: { x: 380, y: 350 }, end: { x: 260, y: 250 } },
  { start: { x: 20, y: 200 }, end: { x: 145, y: 195 } },
  { start: { x: 400, y: 130 }, end: { x: 270, y: 180 } },
]

export default function Community() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const root = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const chophraseRef = useRef<HTMLSpanElement>(null)
  const vephraseRef = useRef<HTMLSpanElement>(null)
  const strikeRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([eyebrowRef.current, bodyRef.current, '.co-headline', '.co-writer', '.co-person'], { opacity: 1 })
        gsap.set('.co-person', { transform: 'none' })
        gsap.set(strikeRef.current, { scaleX: 1 })
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set('.co-headline', { opacity: 0, y: 20 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.co-writer', { opacity: 0, scale: 0, transformOrigin: 'center' })
      gsap.set(chophraseRef.current, { color: 'inherit' })
      gsap.set(strikeRef.current, { scaleX: 0, transformOrigin: 'left center' })

      PEOPLE.forEach((_, i) => {
        gsap.set(`.co-person-${i}`, {
          opacity: 0,
          scale: 0.7,
          transformOrigin: 'center',
        })
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
      tl.to('.co-writer', { opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(2)' }, 0.05)

      PEOPLE.forEach((p, i) => {
        tl.fromTo(
          `.co-person-${i}`,
          { opacity: 0, x: p.start.x - p.end.x, y: p.start.y - p.end.y, scale: 0.6 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.1 + i * 0.04,
        )
      })

      tl.to('.co-headline', { opacity: 1, y: 0, duration: 0.3 }, 0.55)
      tl.to(strikeRef.current, { scaleX: 1, duration: 0.25, ease: 'power2.out' }, 0.72)
      tl.to(chophraseRef.current, { color: '#c68b3c', duration: 0.15 }, 0.75)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.82)
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="community"
      ref={root}
      className="relative w-full bg-ochre text-forest-deep"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('community.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">06 / 10</span>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <svg
            viewBox="0 0 430 430"
            aria-hidden="true"
            className="mx-auto h-80 w-80 text-forest-deep md:h-[26rem] md:w-[26rem]"
          >
            {PEOPLE.map((p, i) => (
              <g key={i} className={`co-person co-person-${i}`} transform={`translate(${p.end.x} ${p.end.y})`}>
                <circle cx="0" cy="-5" r="3.5" fill="currentColor" opacity="0.75" />
                <path d="M -5 8 Q 0 -2 5 8 Z" fill="currentColor" opacity="0.6" />
              </g>
            ))}
            <g className="co-writer" transform="translate(215 200)">
              <circle cx="0" cy="-8" r="6" fill="currentColor" />
              <path d="M -9 14 Q 0 -3 9 14 Z" fill="currentColor" />
            </g>
          </svg>

          <div className="flex flex-col gap-6">
            <h2 className="co-headline serif beat-text text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
              {isEn ? (
                <>
                  I write{' '}
                  <span ref={chophraseRef} className="font-medium">for</span>{' '}
                  a community —{' '}
                  <br className="hidden md:inline" />
                  not{' '}
                  <span className="relative inline-block">
                    <span ref={vephraseRef}>about</span>
                    <span
                      ref={strikeRef}
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 block h-[3px] w-full bg-forest-deep"
                    />
                  </span>{' '}
                  it.
                </>
              ) : (
                <>
                  Viết{' '}
                  <span ref={chophraseRef} className="font-medium">cho</span>{' '}
                  cộng đồng —{' '}
                  <br className="hidden md:inline" />
                  không viết{' '}
                  <span className="relative inline-block">
                    <span ref={vephraseRef}>về</span>
                    <span
                      ref={strikeRef}
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 block h-[3px] w-full bg-forest-deep"
                    />
                  </span>{' '}
                  họ.
                </>
              )}
            </h2>
            <p
              ref={bodyRef}
              className="beat-text max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('community.body')}
            </p>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

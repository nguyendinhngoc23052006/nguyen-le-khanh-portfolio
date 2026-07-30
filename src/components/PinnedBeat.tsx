import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Motif, { type MotifKind } from './Motif'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  id: string
  eyebrow?: string
  headline: string
  body?: string
  motif?: MotifKind
  align?: 'left' | 'center'
  tone?: 'cream' | 'forest' | 'ochre'
}

const toneClasses: Record<NonNullable<Props['tone']>, string> = {
  cream: 'bg-cream text-forest-deep',
  forest: 'bg-forest text-cream',
  ochre: 'bg-ochre text-forest-deep',
}

export default function PinnedBeat({
  id,
  eyebrow,
  headline,
  body,
  motif,
  align = 'left',
  tone = 'cream',
}: Props) {
  const outer = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!outer.current) return
    const ctx = gsap.context(() => {
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 8 },
          {
            opacity: 0.7,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: outer.current,
              start: 'top bottom',
              end: 'top center',
              scrub: true,
            },
          },
        )
      }

      const words = headlineRef.current?.querySelectorAll('.word')
      if (words && words.length) {
        gsap.fromTo(
          words,
          { opacity: 0.12, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: outer.current,
              start: 'top 80%',
              end: 'top top',
              scrub: true,
            },
          },
        )
      }

      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: outer.current,
              start: 'top top',
              end: '+=40%',
              scrub: true,
            },
          },
        )
      }
    }, outer)
    return () => ctx.revert()
  }, [])

  const alignClass =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'

  const words = headline.split(' ')

  return (
    <section
      id={id}
      ref={outer}
      className={`relative w-full ${toneClasses[tone]}`}
      style={{ minHeight: '200vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        {motif ? <Motif kind={motif} /> : null}
        <div
          className={`relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 ${alignClass}`}
        >
          {eyebrow ? (
            <span
              ref={eyebrowRef}
              className="text-xs uppercase tracking-[0.3em]"
            >
              {eyebrow}
            </span>
          ) : null}
          <h2
            ref={headlineRef}
            className="serif beat-text text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
          >
            {words.map((w, i) => (
              <span key={i} className="word">
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
          {body ? (
            <p
              ref={bodyRef}
              className="beat-text max-w-2xl text-base leading-relaxed md:text-lg"
            >
              {body}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

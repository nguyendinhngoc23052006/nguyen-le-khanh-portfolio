import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import type { ReactNode } from 'react'

type Props = {
  id: string
  eyebrow?: string
  headline: string
  body?: string
  motif?: ReactNode
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
  const root = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      })
      if (bodyRef.current) {
        gsap.from(bodyRef.current, {
          y: 20,
          opacity: 0,
          duration: 1,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
          },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <section
      id={id}
      ref={root}
      className={`relative flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-16 lg:px-24 ${toneClasses[tone]}`}
    >
      <div className={`mx-auto flex w-full max-w-5xl flex-col gap-6 ${alignClass}`}>
        {eyebrow ? (
          <span className="text-xs uppercase tracking-[0.3em] opacity-70">{eyebrow}</span>
        ) : null}
        <h2
          ref={headlineRef}
          className="serif beat-text text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
        >
          {headline}
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
      {motif ? <div className="pointer-events-none absolute inset-0 -z-0">{motif}</div> : null}
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const BRANCHES = [
  { d: 'M 200 340 Q 150 300 110 270', tip: { x: 110, y: 270 }, stage: 0 },
  { d: 'M 200 310 Q 250 275 290 245', tip: { x: 290, y: 245 }, stage: 0 },
  { d: 'M 200 270 Q 155 235 115 205', tip: { x: 115, y: 205 }, stage: 1 },
  { d: 'M 200 240 Q 245 205 280 170', tip: { x: 280, y: 170 }, stage: 1 },
  { d: 'M 200 200 Q 160 165 130 130', tip: { x: 130, y: 130 }, stage: 2 },
  { d: 'M 200 170 Q 240 135 265 100', tip: { x: 265, y: 100 }, stage: 2 },
]

function splitByPunctuation(text: string): string[] {
  const parts: string[] = []
  let buf = ''
  for (const ch of text) {
    buf += ch
    if (ch === ',' || ch === '.') {
      parts.push(buf.trim())
      buf = ''
    }
  }
  if (buf.trim()) parts.push(buf.trim())
  return parts
}

export default function Learning() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const trunkRef = useRef<SVGLineElement>(null)
  const canopyRef = useRef<SVGCircleElement>(null)
  const reduced = useReducedMotion()

  const phrases = splitByPunctuation(t('learning.headline'))

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [eyebrowRef.current, bodyRef.current, '.lr-branch', '.lr-leaf', '.lr-phrase', canopyRef.current],
          { opacity: 1 },
        )
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
      gsap.set('.lr-phrase', { opacity: 0, y: 20 })
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

      // Stage 1: trunk grows + first phrase lands
      tl.to(trunkRef.current, { attr: { y2: 260 }, duration: 0.25, ease: 'power1.out' }, 0.05)
      tl.to('.lr-phrase-0', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.15)

      // Stage 2: trunk continues + first pair of branches + second phrase
      tl.to(trunkRef.current, { attr: { y2: 200 }, duration: 0.2, ease: 'power1.out' }, 0.28)
      tl.to(
        ['.lr-branch-0', '.lr-branch-1'],
        { strokeDashoffset: 0, duration: 0.3, stagger: 0.06, ease: 'power1.out' },
        0.3,
      )
      tl.to(
        ['.lr-leaf-0', '.lr-leaf-1'],
        { opacity: 1, scale: 1, duration: 0.22, stagger: 0.06, ease: 'back.out(1.8)' },
        0.42,
      )
      phrases[1] &&
        tl.to('.lr-phrase-1', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.45)

      // Stage 3: trunk to top + more branches + third phrase
      tl.to(trunkRef.current, { attr: { y2: 120 }, duration: 0.22, ease: 'power1.out' }, 0.55)
      tl.to(
        ['.lr-branch-2', '.lr-branch-3', '.lr-branch-4', '.lr-branch-5'],
        { strokeDashoffset: 0, duration: 0.3, stagger: 0.05, ease: 'power1.out' },
        0.58,
      )
      tl.to(
        ['.lr-leaf-2', '.lr-leaf-3', '.lr-leaf-4', '.lr-leaf-5'],
        { opacity: 1, scale: 1, duration: 0.22, stagger: 0.05, ease: 'back.out(1.8)' },
        0.68,
      )
      phrases[2] &&
        tl.to('.lr-phrase-2', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.7)

      // Payoff: full canopy blooms + body
      tl.to(canopyRef.current, { opacity: 0.18, scale: 1, duration: 0.4, ease: 'power2.out' }, 0.78)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.86)

      // Idle loops
      gsap.to('.lr-leaf', {
        y: '+=4',
        rotation: 4,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center',
        stagger: { each: 0.2, from: 'random' },
      })
      gsap.to(canopyRef.current, {
        scale: 1.06,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="learning"
      ref={root}
      className="relative w-full bg-cream text-forest-deep"
      style={{ minHeight: '340vh' }}
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
            <circle ref={canopyRef} cx="200" cy="150" r="150" fill="currentColor" />
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
                className={`lr-branch lr-branch-${i}`}
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
                className={`lr-leaf lr-leaf-${i}`}
                cx={b.tip.x}
                cy={b.tip.y}
                r="6"
                fill="currentColor"
              />
            ))}
          </svg>

          <div className="flex flex-col gap-6">
            <h2 className="serif beat-text text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
              {phrases.map((phrase, i) => (
                <span key={i} className={`lr-phrase lr-phrase-${i} block`}>
                  {phrase}
                </span>
              ))}
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

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

// A path curving from bottom-center back into the trees, with a small
// figure at the entrance.
const LEAVES = Array.from({ length: 12 }, (_, i) => ({
  x: 40 + ((i * 71) % 420),
  y: -20 - (i % 5) * 40,
  size: 4 + (i % 3),
  delay: (i * 0.6) % 6,
  duration: 6 + (i % 4),
}))

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
        gsap.set(
          [
            eyebrowRef.current,
            headlineRef.current,
            bodyRef.current,
            '.bl-tree',
            '.bl-path',
            '.bl-figure',
            '.bl-leaf',
            '.bl-moon',
          ],
          { opacity: 1 },
        )
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.bl-tree-far', { opacity: 0, y: 20 })
      gsap.set('.bl-tree-mid', { opacity: 0, y: 30 })
      gsap.set('.bl-tree-near', { opacity: 0, y: 40 })
      gsap.set('.bl-moon', { opacity: 0, scale: 0.6, transformOrigin: 'center' })
      gsap.set('.bl-path', { strokeDasharray: 700, strokeDashoffset: 700, opacity: 0 })
      gsap.set('.bl-figure', { opacity: 0, y: 20 })
      gsap.set('.bl-leaf', { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.75, duration: 0.05 }, 0)
      tl.to('.bl-moon', { opacity: 0.9, scale: 1, duration: 0.25, ease: 'power2.out' }, 0.05)
      tl.to('.bl-tree-far', { opacity: 0.35, y: 0, duration: 0.3 }, 0.1)
      tl.to('.bl-tree-mid', { opacity: 0.6, y: 0, duration: 0.3 }, 0.18)
      tl.to('.bl-tree-near', { opacity: 0.9, y: 0, duration: 0.3 }, 0.26)
      tl.to('.bl-path', { opacity: 0.4, strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 0.3)
      tl.to('.bl-figure', { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.42)
      tl.to('.bl-leaf', { opacity: 0.9, duration: 0.4, stagger: { amount: 0.4, from: 'random' } }, 0.5)
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.6)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.78)

      // Idle: leaves keep falling, figure sways, moon glows
      LEAVES.forEach((leaf, i) => {
        gsap.to(`.bl-leaf-${i}`, {
          y: 500,
          x: `+=${(i % 2 === 0 ? 1 : -1) * (20 + i)}`,
          rotate: (i % 2 === 0 ? 1 : -1) * 180,
          duration: leaf.duration,
          repeat: -1,
          ease: 'sine.in',
          delay: leaf.delay,
        })
      })
      gsap.to('.bl-figure', {
        y: '-=2',
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.bl-moon', {
        scale: 1.05,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.bl-tree-near', {
        skewX: 0.6,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center bottom',
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
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-20 md:px-16 md:py-24 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('belief.eyebrow')}
          </span>
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-10 lg:gap-12">
          <svg
            viewBox="0 0 500 400"
            aria-hidden="true"
            className="h-64 w-full max-w-lg md:h-72 lg:h-80"
          >
            {/* Moon */}
            <circle className="bl-moon" cx="410" cy="70" r="26" fill="#e6d9b6" opacity="0.9" />
            <circle className="bl-moon" cx="410" cy="70" r="42" fill="#e6d9b6" opacity="0.15" />

            {/* Far tree line — small, faint */}
            <g className="bl-tree bl-tree-far" fill="#5a6e5a">
              <path d="M 20 250 L 30 200 L 40 250 Z" />
              <path d="M 60 250 L 72 190 L 84 250 Z" />
              <path d="M 100 250 L 108 210 L 116 250 Z" />
              <path d="M 140 250 L 150 195 L 160 250 Z" />
              <path d="M 180 250 L 192 205 L 204 250 Z" />
              <path d="M 240 250 L 250 190 L 260 250 Z" />
              <path d="M 280 250 L 290 200 L 300 250 Z" />
              <path d="M 330 250 L 342 195 L 354 250 Z" />
              <path d="M 380 250 L 390 210 L 400 250 Z" />
              <path d="M 430 250 L 442 195 L 454 250 Z" />
              <path d="M 470 250 L 478 210 L 486 250 Z" />
            </g>

            {/* Mid tree line — bigger, darker */}
            <g className="bl-tree bl-tree-mid" fill="#324133">
              <path d="M 0 300 L 20 220 L 40 300 Z" />
              <path d="M 55 300 L 78 200 L 100 300 Z" />
              <path d="M 115 300 L 138 215 L 160 300 Z" />
              <path d="M 200 300 L 225 205 L 250 300 Z" />
              <path d="M 300 300 L 322 215 L 344 300 Z" />
              <path d="M 360 300 L 385 200 L 410 300 Z" />
              <path d="M 430 300 L 455 210 L 480 300 Z" />
            </g>

            {/* Near tree line — biggest, darkest */}
            <g className="bl-tree bl-tree-near" fill="#122015">
              <path d="M -20 400 L 20 240 L 60 400 Z" />
              <path d="M 90 400 L 130 220 L 170 400 Z" />
              <path d="M 330 400 L 370 220 L 410 400 Z" />
              <path d="M 440 400 L 480 235 L 520 400 Z" />
            </g>

            {/* Path curving from bottom-center back into the trees */}
            <path
              className="bl-path"
              d="M 250 400 Q 245 350 240 315 Q 235 285 245 260 Q 258 240 250 220"
              fill="none"
              stroke="#8a7550"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Figure at the entrance of the path */}
            <g className="bl-figure" transform="translate(250 370)">
              <circle cx="0" cy="-14" r="7" fill="#122015" />
              <path
                d="M -8 12 C -10 4 -6 -4 0 -4 C 6 -4 10 4 8 12 Z"
                fill="#122015"
              />
            </g>

            {/* Falling leaves */}
            <g>
              {LEAVES.map((leaf, i) => (
                <ellipse
                  key={i}
                  className={`bl-leaf bl-leaf-${i}`}
                  cx={leaf.x}
                  cy={leaf.y}
                  rx={leaf.size}
                  ry={leaf.size / 2}
                  fill={i % 2 === 0 ? '#c68b3c' : '#8a5a2a'}
                  transform={`rotate(${i * 30} ${leaf.x} ${leaf.y})`}
                />
              ))}
            </g>
          </svg>

          <div className="flex flex-col items-center gap-6 text-center">
            <h2
              ref={headlineRef}
              className="serif beat-text max-w-3xl text-3xl leading-[1.1] md:text-4xl lg:text-5xl"
            >
              {t('belief.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="max-w-xl text-base leading-relaxed md:text-lg"
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

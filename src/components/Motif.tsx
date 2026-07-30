import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type MotifKind =
  | 'compass'
  | 'wave'
  | 'thread'
  | 'ripple'
  | 'orbit'
  | 'seed'
  | 'spiral'
  | 'horizon'

const PATHS: Record<MotifKind, string> = {
  compass:
    'M200 60 L 200 340 M 60 200 L 340 200 M 200 200 L 280 120 L 200 200 L 120 280 Z',
  wave: 'M20 200 Q 80 120 140 200 T 260 200 T 380 200',
  thread:
    'M40 60 C 120 60, 120 340, 200 200 S 280 60, 360 340',
  ripple:
    'M200 200 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0 M200 200 m -90 0 a 90 90 0 1 0 180 0 a 90 90 0 1 0 -180 0 M200 200 m -150 0 a 150 150 0 1 0 300 0 a 150 150 0 1 0 -300 0',
  orbit:
    'M200 200 m -140 0 a 140 140 0 1 0 280 0 a 140 140 0 1 0 -280 0 M60 200 L 340 200 M200 60 L 200 340',
  seed: 'M200 360 L 200 200 M 200 220 Q 260 180 300 140 M 200 220 Q 140 180 100 140 M 200 260 Q 260 220 300 200 M 200 260 Q 140 220 100 200',
  spiral:
    'M200 200 m 0 -10 a 10 10 0 1 1 -10 10 a 20 20 0 1 1 20 -20 a 40 40 0 1 1 -40 40 a 70 70 0 1 1 70 -70 a 110 110 0 1 1 -110 110 a 160 160 0 1 1 160 -160',
  horizon:
    'M20 260 L 380 260 M 60 220 L 340 220 M 100 190 L 300 190 M 140 170 L 260 170 M 180 158 L 220 158',
}

export default function Motif({ kind }: { kind: MotifKind }) {
  const svg = useRef<SVGSVGElement>(null)
  const path = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!path.current || !svg.current) return
    const section = svg.current.closest('section')
    if (!section) return

    const length = path.current.getTotalLength()
    path.current.style.strokeDasharray = `${length}`
    path.current.style.strokeDashoffset = `${length}`

    const ctx = gsap.context(() => {
      gsap.to(path.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [kind])

  return (
    <svg
      ref={svg}
      viewBox="0 0 400 400"
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 -z-0 w-56 -translate-y-1/2 opacity-30 md:right-16 md:w-80 lg:right-24 lg:w-[28rem]"
    >
      <path
        ref={path}
        d={PATHS[kind]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

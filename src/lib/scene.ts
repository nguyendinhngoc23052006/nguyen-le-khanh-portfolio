import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export function useSceneTimeline(
  setup: (tl: gsap.core.Timeline, ctx: {
    root: HTMLElement
    reduced: boolean
  }) => void,
  deps: unknown[] = [],
): { root: React.RefObject<HTMLElement> } {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: reduced ? false : 0.6,
        },
      })
      setup(tl, { root: root.current!, reduced })
    }, root)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps])
  return { root }
}

export function splitLetters(text: string): string[] {
  return Array.from(text)
}

export function splitWords(text: string): string[] {
  return text.split(' ')
}

export function splitWordsIntoLetters(text: string): string[][] {
  return text.split(' ').map((word) => Array.from(word))
}

export function dotsOnRing(
  count: number,
  radius: number,
  cx = 200,
  cy = 200,
  startAngle = -Math.PI / 2,
): { x: number; y: number; angle: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + (i / count) * Math.PI * 2
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      angle,
    }
  })
}

export function randomPoints(
  count: number,
  seed = 1,
): { x: number; y: number }[] {
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
  }))
}

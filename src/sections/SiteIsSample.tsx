import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { label: 'Hero', height: 44 },
  { label: 'Belief', height: 36 },
  { label: 'Truyền thông', height: 36 },
  { label: 'Cuộc thi', height: 36 },
  { label: 'Sự kiện', height: 36 },
  { label: 'Cộng đồng', height: 36 },
  { label: 'Học hỏi', height: 36 },
  { label: 'Sample', height: 36 },
  { label: 'Sẵn sàng', height: 32 },
  { label: 'Liên hệ', height: 40 },
]

export default function SiteIsSample() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const wireframeRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([eyebrowRef.current, headlineRef.current, bodyRef.current, wireframeRef.current, markerRef.current], { opacity: 1 })
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set(wireframeRef.current, { opacity: 0, y: 20 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
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
      tl.to(wireframeRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.05)
      tl.to('.si-scene', {
        opacity: 1,
        duration: 0.15,
        stagger: 0.04,
      }, 0.1)
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.55)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.75)

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (markerRef.current) {
            gsap.set(markerRef.current, { top: `${self.progress * 100}%` })
          }
        },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="site-is-sample"
      ref={root}
      className="relative w-full bg-forest text-cream"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-24 md:px-16 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('siteIsSample.eyebrow')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] opacity-40">08 / 10</span>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6">
            <h2
              ref={headlineRef}
              className="serif beat-text text-4xl leading-[1.05] md:text-5xl lg:text-6xl"
            >
              {t('siteIsSample.headline')}
            </h2>
            <p
              ref={bodyRef}
              className="beat-text max-w-xl text-base leading-relaxed md:text-lg"
            >
              {t('siteIsSample.body')}
            </p>
          </div>

          <div
            ref={wireframeRef}
            className="relative mx-auto flex w-40 flex-col gap-2 rounded-md border border-cream/25 bg-forest-deep/40 p-3"
          >
            {SCENES.map((s, i) => (
              <div
                key={i}
                className="si-scene relative rounded-sm bg-cream/10 px-2 py-1 text-[10px] uppercase tracking-widest opacity-0"
                style={{ height: `${s.height}px` }}
              >
                {s.label}
              </div>
            ))}
            <div
              ref={markerRef}
              className="pointer-events-none absolute left-[-8px] top-0 flex items-center gap-2"
              style={{ top: '0%' }}
            >
              <span className="h-2 w-2 rounded-full bg-ochre" />
              <span className="text-[9px] uppercase tracking-widest text-ochre">You are here</span>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

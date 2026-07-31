import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '../lib/scene'

gsap.registerPlugin(ScrollTrigger)

// Each scene rendered as a mini "page" with a small icon representing its
// motif, so the wireframe reads as a real design mockup instead of blank bars.
const SCENES = [
  { label: 'Hero', h: 70, motif: 'name' },
  { label: 'Belief', h: 58, motif: 'path' },
  { label: 'Truyền thông', h: 58, motif: 'board' },
  { label: 'Cuộc thi', h: 58, motif: 'notebook' },
  { label: 'Sự kiện', h: 58, motif: 'stage' },
  { label: 'Cộng đồng', h: 58, motif: 'fire' },
  { label: 'Học hỏi', h: 58, motif: 'tree' },
  { label: 'Sample', h: 50, motif: 'grid' },
  { label: 'Sẵn sàng', h: 62, motif: 'sun' },
  { label: 'Liên hệ', h: 58, motif: 'envelope' },
]

function Motif({ kind }: { kind: string }) {
  const stroke = 'currentColor'
  switch (kind) {
    case 'name':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <rect x="2" y="6" width="36" height="8" fill="none" stroke={stroke} strokeWidth="1" />
        </svg>
      )
    case 'path':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <path d="M 20 20 Q 18 14 22 10 Q 26 6 20 2" fill="none" stroke={stroke} strokeWidth="1" />
        </svg>
      )
    case 'board':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <rect x="4" y="4" width="10" height="12" fill="none" stroke={stroke} strokeWidth="1" />
          <rect x="18" y="4" width="10" height="12" fill="none" stroke={stroke} strokeWidth="1" />
        </svg>
      )
    case 'notebook':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <rect x="6" y="4" width="24" height="12" fill="none" stroke={stroke} strokeWidth="1" />
          <line x1="10" y1="8" x2="26" y2="8" stroke={stroke} strokeWidth="0.75" />
          <line x1="10" y1="12" x2="22" y2="12" stroke={stroke} strokeWidth="0.75" />
        </svg>
      )
    case 'stage':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <rect x="4" y="12" width="32" height="4" fill={stroke} opacity="0.6" />
          <path d="M 20 12 L 15 20 L 25 20 Z" fill="none" stroke={stroke} strokeWidth="0.75" />
        </svg>
      )
    case 'fire':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <circle cx="20" cy="12" r="4" fill={stroke} opacity="0.6" />
          <path d="M 20 12 Q 18 8 20 4 Q 22 8 20 12" fill={stroke} opacity="0.5" />
        </svg>
      )
    case 'tree':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <line x1="20" y1="16" x2="20" y2="8" stroke={stroke} strokeWidth="1" />
          <circle cx="20" cy="6" r="4" fill={stroke} opacity="0.5" />
        </svg>
      )
    case 'grid':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <rect x="6" y="4" width="8" height="12" fill="none" stroke={stroke} strokeWidth="0.75" />
          <rect x="16" y="4" width="8" height="12" fill="none" stroke={stroke} strokeWidth="0.75" />
          <rect x="26" y="4" width="8" height="12" fill="none" stroke={stroke} strokeWidth="0.75" />
        </svg>
      )
    case 'sun':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <circle cx="20" cy="14" r="5" fill={stroke} opacity="0.7" />
          <line x1="0" y1="18" x2="40" y2="18" stroke={stroke} strokeWidth="0.75" />
        </svg>
      )
    case 'envelope':
      return (
        <svg viewBox="0 0 40 20" className="h-4 w-8 opacity-70">
          <rect x="6" y="6" width="28" height="10" fill="none" stroke={stroke} strokeWidth="1" />
          <path d="M 6 6 L 20 14 L 34 6" fill="none" stroke={stroke} strokeWidth="0.75" />
        </svg>
      )
    default:
      return null
  }
}

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
        gsap.set(
          [eyebrowRef.current, headlineRef.current, bodyRef.current, wireframeRef.current, markerRef.current, '.si-scene'],
          { opacity: 1 },
        )
        return
      }

      gsap.set(eyebrowRef.current, { opacity: 0 })
      gsap.set(wireframeRef.current, { opacity: 0, y: 20 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(bodyRef.current, { opacity: 0, y: 20 })
      gsap.set('.si-scene', { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      tl.to(eyebrowRef.current, { opacity: 0.75, duration: 0.05 }, 0)
      tl.to(wireframeRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.05)
      tl.to('.si-scene', { opacity: 1, duration: 0.15, stagger: 0.035 }, 0.1)
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.55)
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.75)

      const pageTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (markerRef.current) {
            gsap.set(markerRef.current, { top: `${self.progress * 100}%` })
          }
          // Highlight the scene the marker is currently over
          const idx = Math.min(SCENES.length - 1, Math.floor(self.progress * SCENES.length))
          const nodes = wireframeRef.current?.querySelectorAll('.si-scene')
          nodes?.forEach((n, i) => {
            n.classList.toggle('si-scene-active', i === idx)
          })
        },
      })

      return () => {
        pageTrigger.kill()
      }
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
      <style>{`
        .si-scene { transition: background-color 0.4s ease, border-color 0.4s ease; }
        .si-scene-active {
          background-color: rgba(198, 139, 60, 0.35) !important;
          border-color: rgba(255, 210, 130, 0.7) !important;
          box-shadow: 0 0 12px rgba(198, 139, 60, 0.4);
        }
      `}</style>
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-20 md:px-16 md:py-24 lg:px-24">
        <div className="relative z-10 flex justify-between">
          <span ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em]">
            {t('siteIsSample.eyebrow')}
          </span>
        </div>

        <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6">
            <h2
              ref={headlineRef}
              className="serif beat-text text-3xl leading-[1.1] md:text-4xl lg:text-5xl"
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
            className="relative mx-auto w-48 rounded-lg border border-cream/25 bg-forest-deep/60 p-3 shadow-xl"
            style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.3)' }}
          >
            {/* Fake browser chrome */}
            <div className="mb-2 flex items-center gap-1 border-b border-cream/15 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cream/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-cream/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-cream/30" />
              <span className="ml-2 text-[7px] uppercase tracking-widest text-cream/40">
                nguyenlekhanh
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {SCENES.map((s, i) => (
                <div
                  key={i}
                  className="si-scene relative flex items-center gap-1.5 rounded border border-cream/15 bg-cream/[0.06] px-2 py-1 text-cream/80 opacity-0"
                  style={{ height: `${s.h}px` }}
                >
                  <Motif kind={s.motif} />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="h-0.5 w-full rounded bg-cream/20" />
                    <div className="h-0.5 w-3/4 rounded bg-cream/15" />
                  </div>
                </div>
              ))}
            </div>
            {/* Marker with arrow pointing at current scene */}
            <div
              ref={markerRef}
              className="pointer-events-none absolute -left-3 top-0 flex -translate-y-1/2 items-center gap-1.5"
            >
              <span className="text-ochre" style={{ filter: 'drop-shadow(0 0 4px rgba(198,139,60,0.7))' }}>
                ▸
              </span>
              <span className="whitespace-nowrap rounded bg-ochre px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-widest text-forest-deep">
                You are here
              </span>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </section>
  )
}

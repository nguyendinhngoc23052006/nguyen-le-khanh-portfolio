import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

const SCENES: { id: string; vi: string; en: string }[] = [
  { id: 'hero', vi: 'Mở đầu', en: 'Opening' },
  { id: 'belief', vi: 'Niềm tin', en: 'Belief' },
  { id: 'work-student-union', vi: 'Truyền thông', en: 'Broadcast' },
  { id: 'work-contest', vi: 'Cuộc thi', en: 'Contest' },
  { id: 'work-events', vi: 'Sự kiện', en: 'Events' },
  { id: 'community', vi: 'Cộng đồng', en: 'Community' },
  { id: 'learning', vi: 'Học hỏi', en: 'Learning' },
  { id: 'site-is-sample', vi: 'Mẫu', en: 'Sample' },
  { id: 'ready', vi: 'Sẵn sàng', en: 'Ready' },
  { id: 'contact', vi: 'Liên hệ', en: 'Contact' },
]

export default function ChapterIndicator() {
  const { i18n } = useTranslation()
  const [active, setActive] = useState(0)
  const labelRef = useRef<HTMLSpanElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers = SCENES.map((s, i) =>
      ScrollTrigger.create({
        trigger: `#${s.id}`,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) setActive(i)
        },
      }),
    )

    const progressTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, { scaleY: self.progress })
        }
      },
    })

    return () => {
      triggers.forEach((t) => t.kill())
      progressTrigger.kill()
    }
  }, [])

  useEffect(() => {
    if (!labelRef.current || !numberRef.current) return
    gsap.fromTo(
      [numberRef.current, labelRef.current],
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
    )
  }, [active])

  const scene = SCENES[active]
  const label = i18n.language === 'en' ? scene.en : scene.vi
  const number = String(active + 1).padStart(2, '0')

  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-40 flex items-end gap-2 mix-blend-difference text-cream md:bottom-6 md:right-6 md:gap-3">
      <div className="flex h-10 w-[2px] items-end justify-end overflow-hidden bg-cream/20 md:h-16">
        <div
          ref={barRef}
          className="h-full w-full origin-bottom bg-cream"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>
      <div className="flex flex-col items-end gap-1 text-right">
        <span
          ref={numberRef}
          className="serif text-sm leading-none tracking-tight md:text-2xl"
        >
          {number}
          <span className="opacity-40"> / 10</span>
        </span>
        <span
          ref={labelRef}
          className="hidden text-[10px] uppercase tracking-[0.3em] opacity-80 md:inline"
        >
          {label}
        </span>
      </div>
    </div>
  )
}

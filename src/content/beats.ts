export const beats = [
  'hero',
  'belief',
  'workStudentUnion',
  'workContest',
  'workEvents',
  'community',
  'learning',
  'siteIsSample',
  'ready',
  'contact',
] as const

export type BeatKey = (typeof beats)[number]

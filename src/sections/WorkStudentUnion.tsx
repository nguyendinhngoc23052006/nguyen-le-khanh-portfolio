import { useTranslation } from 'react-i18next'
import PinnedBeat from '../components/PinnedBeat'

export default function WorkStudentUnion() {
  const { t } = useTranslation()
  return (
    <PinnedBeat
      id="work-student-union"
      eyebrow={t('workStudentUnion.eyebrow')}
      headline={t('workStudentUnion.headline')}
      body={t('workStudentUnion.body')}
      motif="wave"
      tone="forest"
    />
  )
}

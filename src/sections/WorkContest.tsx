import { useTranslation } from 'react-i18next'
import PinnedBeat from '../components/PinnedBeat'

export default function WorkContest() {
  const { t } = useTranslation()
  return (
    <PinnedBeat
      id="work-contest"
      eyebrow={t('workContest.eyebrow')}
      headline={t('workContest.headline')}
      body={t('workContest.body')}
      motif="thread"
      tone="cream"
    />
  )
}

import { useTranslation } from 'react-i18next'
import PinnedBeat from '../components/PinnedBeat'

export default function WorkEvents() {
  const { t } = useTranslation()
  return (
    <PinnedBeat
      id="work-events"
      eyebrow={t('workEvents.eyebrow')}
      headline={t('workEvents.headline')}
      body={t('workEvents.body')}
      motif="ripple"
      tone="forest"
    />
  )
}

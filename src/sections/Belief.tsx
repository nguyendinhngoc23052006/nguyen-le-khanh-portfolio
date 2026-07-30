import { useTranslation } from 'react-i18next'
import PinnedBeat from '../components/PinnedBeat'

export default function Belief() {
  const { t } = useTranslation()
  return (
    <PinnedBeat
      id="belief"
      eyebrow={t('belief.eyebrow')}
      headline={t('belief.headline')}
      body={t('belief.body')}
      motif="compass"
      tone="cream"
    />
  )
}

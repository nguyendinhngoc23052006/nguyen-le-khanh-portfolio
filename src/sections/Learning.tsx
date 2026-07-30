import { useTranslation } from 'react-i18next'
import PinnedBeat from '../components/PinnedBeat'

export default function Learning() {
  const { t } = useTranslation()
  return (
    <PinnedBeat
      id="learning"
      eyebrow={t('learning.eyebrow')}
      headline={t('learning.headline')}
      body={t('learning.body')}
      motif="seed"
      tone="cream"
    />
  )
}

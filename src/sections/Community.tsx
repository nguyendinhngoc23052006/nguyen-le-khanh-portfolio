import { useTranslation } from 'react-i18next'
import PinnedBeat from '../components/PinnedBeat'

export default function Community() {
  const { t } = useTranslation()
  return (
    <PinnedBeat
      id="community"
      eyebrow={t('community.eyebrow')}
      headline={t('community.headline')}
      body={t('community.body')}
      tone="ochre"
    />
  )
}

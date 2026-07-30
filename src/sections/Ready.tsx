import { useTranslation } from 'react-i18next'
import PinnedBeat from '../components/PinnedBeat'

export default function Ready() {
  const { t } = useTranslation()
  return (
    <PinnedBeat
      id="ready"
      headline={t('ready.headline')}
      body={t('ready.body')}
      tone="ochre"
      align="center"
    />
  )
}

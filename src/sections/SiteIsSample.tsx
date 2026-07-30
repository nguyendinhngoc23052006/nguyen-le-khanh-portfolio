import { useTranslation } from 'react-i18next'
import PinnedBeat from '../components/PinnedBeat'

export default function SiteIsSample() {
  const { t } = useTranslation()
  return (
    <PinnedBeat
      id="site-is-sample"
      eyebrow={t('siteIsSample.eyebrow')}
      headline={t('siteIsSample.headline')}
      body={t('siteIsSample.body')}
      tone="forest"
    />
  )
}

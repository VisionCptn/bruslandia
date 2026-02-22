import { getTranslations } from '../../utils/getTranslations'
import { SuccessView } from './SuccessView'

export default async function CheckoutSuccessPage() {
  const t = await getTranslations()

  return <SuccessView t={t} />
}

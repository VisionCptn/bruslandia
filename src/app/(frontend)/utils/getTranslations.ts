import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

export type UIStrings = {
  eyesLabel: string
  cartEmpty: string
  continueShopping: string
  cartTotal: string
  checkout: string
  contactInfo: string
  subscribeNewsletter: string
  country: string
  firstName: string
  lastName: string
  middleName: string
  address: string
  postalCode: string
  city: string
  phone: string
  saveAddress: string
  shippingWarning: string
  paymentMethod: string
  paymentSecure: string
  subtotal: string
  shipping: string
  total: string
  processing: string
  selectSize: string
  sizeLabel: string
  addToCart: string
  categoryEmpty: string
  orderSuccessTitle: string
  orderSuccessMessage: string
  backToHome: string
}

const fallback: UIStrings = {
  eyesLabel: 'ця рись бачить тебе наскрізь',
  cartEmpty: 'Корзина порожня',
  continueShopping: 'продовжити покупки',
  cartTotal: 'Сума',
  checkout: 'Оформити замовлення',
  contactInfo: 'контактна інформація',
  subscribeNewsletter: 'Підписатися на розсилку новин та спеціальних пропозицій',
  country: 'Країна',
  firstName: "Ім'я",
  lastName: 'Прізвище',
  middleName: "Ім'я по батькові (для доставки «Нова Пошта»)",
  address: 'Адреса доставки або № відділення «Нова Пошта»',
  postalCode: 'Поштовий індекс',
  city: 'Місто',
  phone: 'Телефон',
  saveAddress: 'Зберегти ці дані для наступного разу',
  shippingWarning:
    'Зверніть увагу, що міжнародні замовлення можуть обкладатися митними зборами та податками країни призначення. Вартість доставки не включає витрати на розмитнення. Рекомендуємо заздалегідь ознайомитися з митними правилами та тарифами у вашій країні, оскільки ми не несемо відповідальності за ці витрати. Дякуємо за розуміння!',
  paymentMethod: 'Спосіб оплати',
  paymentSecure: 'Всі транзакції захищені та зашифровані.',
  subtotal: 'Загальна вартість',
  shipping: 'Вартість доставки',
  total: 'ВСЬОГО',
  processing: 'обробка...',
  selectSize: 'Будь ласка, оберіть розмір',
  sizeLabel: 'Розмір:',
  addToCart: 'додати в корзину',
  categoryEmpty: 'В цій категорії ще немає товарів',
  orderSuccessTitle: 'дякуємо за замовлення!',
  orderSuccessMessage:
    "ми отримали ваше замовлення і зв'яжемося з вами найближчим часом для підтвердження.",
  backToHome: 'повернутися на головну',
}

export async function getTranslations(locale?: string): Promise<UIStrings> {
  try {
    // Detect locale from Accept-Language header if not provided
    if (!locale) {
      const headersList = await headers()
      const acceptLanguage = headersList.get('accept-language') || ''
      locale = acceptLanguage.startsWith('uk') ? 'uk' : 'en'
    }

    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({
      slug: 'settings',
      locale: locale as 'uk' | 'en',
    })

    const ui = settings.ui as Partial<UIStrings> | undefined

    // Merge with fallback so missing fields never break the UI
    return {
      ...fallback,
      ...(ui ?? {}),
      ...(settings.eyesLabel ? { eyesLabel: settings.eyesLabel } : {}),
    }
  } catch {
    return fallback
  }
}

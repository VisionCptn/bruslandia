interface OrderItem {
  productTitle?: string | null
  quantity: number
  size?: string | null
  priceAtPurchase: number
}

interface ShippingAddress {
  firstName?: string | null
  middleName?: string | null
  lastName?: string | null
  country?: string | null
  city?: string | null
  deliveryAddress?: string | null
  postalCode?: string | null
  phone?: string | null
}

interface OrderEmailData {
  orderNumber: string
  customerEmail: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  total: number
  contactEmail?: string | null
  instagramUrl?: string | null
}

const formatPrice = (amount: number) => `${amount} ₴`

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://bryslandia.com'

export function buildOrderConfirmationEmail(order: OrderEmailData): string {
  const { orderNumber, items, shippingAddress, total, contactEmail, instagramUrl } = order
  const { firstName, middleName, lastName, country, city, deliveryAddress, postalCode, phone } =
    shippingAddress

  const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ')

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8e8e8; font-size: 14px; color: #1a1a1a;">
          ${item.productTitle ?? 'Товар'}${item.size ? `<br><span style="font-size: 12px; color: #999;">розмір: ${item.size.toUpperCase()}</span>` : ''}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8e8e8; font-size: 14px; color: #1a1a1a; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8e8e8; font-size: 14px; color: #1a1a1a; text-align: right;">${formatPrice(item.priceAtPurchase * item.quantity)}</td>
      </tr>`,
    )
    .join('')

  const contactLinks = [
    contactEmail
      ? `<a href="mailto:${contactEmail}" style="color: #1a1a1a; text-decoration: none; font-size: 13px;">${contactEmail}</a>`
      : null,
    instagramUrl
      ? `<a href="${instagramUrl}" style="color: #1a1a1a; text-decoration: none; font-size: 13px;">інстаграм</a>`
      : null,
  ]
    .filter(Boolean)
    .join('&nbsp;&nbsp;·&nbsp;&nbsp;')

  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>замовлення ${orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; padding: 0px 20px 40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">

          <!-- Creature -->
          <tr>
            <td style="padding: 0; font-size: 0; line-height: 0;">
              <img
                src="${baseUrl}/email-creature.png"
                alt=""
                width="560"
                style="display: block; width: 100%; border-radius: 12px 12px 0 0;"
              />
            </td>
          </tr>

          <!-- White card -->
          <tr>
            <td bgcolor="#fefefe" style="background-color: #fefefe; border-radius: 0 0 12px 12px; padding: 36px 15px 40px;">

              <!-- Logo -->
              <div style="margin: 0 0 20px;"><img src="${baseUrl}/email-logo.png" width="120" height="52" alt="brys" style="display:block;" /></div>

              <!-- Order number -->
              <p style="margin: 0 0 16px; font-size: 12px; color: #999; letter-spacing: 1px; text-transform: lowercase;">замовлення ${orderNumber}</p>

              <!-- Headline angled -->
              <div style="margin: 0 0 28px; overflow: hidden;"><h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #1a1a1a; line-height: 1.3; display: inline-block; transform: rotate(-2deg); -webkit-transform: rotate(-2deg); transform-origin: left center;">рись дякує та вже пакує ваші товари</h2></div>

              <!-- Items table -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th style="padding: 8px 0; font-size: 11px; font-weight: 400; color: #999; text-align: left; border-bottom: 1px solid #e8e8e8; text-transform: lowercase; letter-spacing: 1px;">товар</th>
                    <th style="padding: 8px 0; font-size: 11px; font-weight: 400; color: #999; text-align: center; border-bottom: 1px solid #e8e8e8; text-transform: lowercase; letter-spacing: 1px;">кіл-ть</th>
                    <th style="padding: 8px 0; font-size: 11px; font-weight: 400; color: #999; text-align: right; border-bottom: 1px solid #e8e8e8; text-transform: lowercase; letter-spacing: 1px;">ціна</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
              </table>

              <!-- Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
                <tr>
                  <td style="font-size: 14px; color: #999; text-transform: lowercase;">разом</td>
                  <td style="font-size: 18px; font-weight: 600; color: #1a1a1a; text-align: right;">${formatPrice(total)}</td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #e8e8e8; margin: 28px 0;" />

              <!-- Address -->
              <p style="margin: 0 0 10px; font-size: 11px; color: #999; letter-spacing: 1px; text-transform: lowercase;">адреса доставки</p>
              <p style="margin: 0; font-size: 14px; color: #1a1a1a; line-height: 1.8; padding-left: 12px; border-left: 2px solid #e8e8e8;">
                ${fullName}<br />
                ${city}${postalCode ? `, ${postalCode}` : ''}<br />
                ${deliveryAddress ? `${deliveryAddress}<br />` : ''}
                ${country}<br />
                ${phone}
              </p>

              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #e8e8e8; margin: 28px 0;" />

              <!-- Footer message -->
              <p style="margin: 0 0 4px; font-size: 13px; color: #999; line-height: 1.7;">
                якщо виникнуть запитання — бажано нам не писати,
                але якщо не сила терпіти то пишіть сюди <a href="mailto:${contactEmail}" style="color: #1a1a1a; text-decoration: underline;">напряму</a>. або накриву
              </p>
              <p style="margin: 0 0 24px; font-size: 13px; color: #1a1a1a;">з любов'ю, bryslandia</p>

              <!-- Contact links right-aligned -->
              ${contactLinks ? `<p style="margin: 0 0 28px; font-size: 13px; text-align: right; color: #999;">${contactLinks}</p>` : ''}

              <!-- Eyes icon centered -->
              <div style="text-align: center; padding-top: 8px;">
                <img src="${baseUrl}/email-eyes.png" width="80" height="60" alt="" style="display:inline-block;" />
              </div>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

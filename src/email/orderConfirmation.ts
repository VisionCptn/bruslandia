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
  postalCode?: string | null
  phone?: string | null
}

interface OrderEmailData {
  orderNumber: string
  customerEmail: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  total: number
}

const formatPrice = (amount: number) => `${amount} ₴`

export function buildOrderConfirmationEmail(order: OrderEmailData): string {
  const { orderNumber, items, shippingAddress, total } = order
  const { firstName, middleName, lastName, country, city, postalCode, phone } = shippingAddress

  const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ')

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
          <span style="font-size: 14px; color: #1a1a1a;">${item.productTitle ?? 'Товар'}</span>
          ${item.size ? `<br><span style="font-size: 12px; color: #888;">розмір: ${item.size.toUpperCase()}</span>` : ''}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: center;">
          <span style="font-size: 14px; color: #1a1a1a;">${item.quantity}</span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
          <span style="font-size: 14px; color: #1a1a1a;">${formatPrice(item.priceAtPurchase * item.quantity)}</span>
        </td>
      </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Підтвердження замовлення ${orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; border-bottom: 2px solid #1a1a1a;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 400; letter-spacing: 4px; color: #1a1a1a; text-transform: lowercase;">bryslandia</h1>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <h2 style="margin: 0 0 8px; font-size: 22px; font-weight: 400; color: #1a1a1a;">дякуємо за замовлення</h2>
              <p style="margin: 0; font-size: 14px; color: #888;">замовлення <strong style="color: #1a1a1a;">${orderNumber}</strong> прийнято в обробку</p>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th style="padding: 10px 0; font-size: 12px; font-weight: 400; color: #888; text-align: left; border-bottom: 1px solid #e5e5e5; text-transform: lowercase; letter-spacing: 1px;">товар</th>
                    <th style="padding: 10px 0; font-size: 12px; font-weight: 400; color: #888; text-align: center; border-bottom: 1px solid #e5e5e5; text-transform: lowercase; letter-spacing: 1px;">кількість</th>
                    <th style="padding: 10px 0; font-size: 12px; font-weight: 400; color: #888; text-align: right; border-bottom: 1px solid #e5e5e5; text-transform: lowercase; letter-spacing: 1px;">ціна</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
              </table>

              <!-- Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
                <tr>
                  <td style="font-size: 16px; color: #1a1a1a;">разом</td>
                  <td style="font-size: 18px; font-weight: 500; color: #1a1a1a; text-align: right;">${formatPrice(total)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0;" />
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 30px 40px;">
              <h3 style="margin: 0 0 16px; font-size: 13px; font-weight: 400; color: #888; text-transform: lowercase; letter-spacing: 1px;">адреса доставки</h3>
              <p style="margin: 0; font-size: 15px; color: #1a1a1a; line-height: 1.7;">
                ${fullName}<br />
                ${city}${postalCode ? `, ${postalCode}` : ''}<br />
                ${country}<br />
                ${phone}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px 40px;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #888; line-height: 1.6;">
                якщо у вас виникли запитання — відповідайте на цей лист або пишіть нам напряму.
              </p>
              <p style="margin: 0; font-size: 13px; color: #888;">
                з любов'ю, <strong style="color: #1a1a1a;">bryslandia</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** URL pública do site, usada para montar links absolutos (ex.: WhatsApp, metadata). */
export const SITE_URL = 'https://mc-material-de-construcao.vercel.app'

/** Número principal de vendas/pedidos (WhatsApp), com DDI 55 + DDD 71 + 9º dígito. */
export const WHATSAPP_NUMBER = '5571984716578'

/** Número secundário de atendimento, exibido no rodapé. */
export const WHATSAPP_NUMBER_SECONDARY = '5571984363256'

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

/** Preço à vista no Pix com 5% de desconto. */
export function pixPrice(value: number): number {
  return value * 0.95
}

export function installmentValue(value: number, times: number): number {
  return value / times
}

export function discountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null
  return Math.round((1 - price / oldPrice) * 100)
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
'use client'

import { WhatsappIcon } from '@/components/icons/whatsapp-icon'
import { whatsappLink } from '@/lib/format'

export function WhatsappFloat() {
  return (
    <a
      href={whatsappLink('Olá! Vim pelo site da MC Material de Construção e preciso de ajuda.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-105"
      aria-label="Falar no WhatsApp"
    >
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-whatsapp opacity-30" />
      <WhatsappIcon className="size-7" />
    </a>
  )
}

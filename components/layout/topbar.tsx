'use client'

import { useEffect, useState } from 'react'
import { Truck, Zap, Percent, Ticket } from 'lucide-react'

const messages = [
  { icon: Truck, text: 'Frete Grátis para Sul e Sudeste' },
  { icon: Zap, text: 'Entrega rápida para sua obra' },
  { icon: Percent, text: 'No Pix 5% OFF em toda a loja' },
  { icon: Ticket, text: 'Cupom: PRIMEIRACOMPRA 5% OFF' },
]

export function Topbar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        {/* Mobile: mensagem rotativa */}
        <div className="flex h-9 items-center justify-center sm:hidden">
          {messages.map(({ icon: Icon, text }, i) => (
            <span
              key={text}
              className={`items-center gap-1.5 text-xs font-medium ${
                i === index ? 'flex' : 'hidden'
              }`}
            >
              <Icon className="size-3.5 text-primary" />
              {text}
            </span>
          ))}
        </div>
        {/* Desktop: todas as mensagens */}
        <div className="hidden h-9 items-center justify-between sm:flex">
          {messages.map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 text-xs font-medium"
            >
              <Icon className="size-3.5 text-primary" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formas de Pagamento',
  description:
    'Conheça as formas de pagamento disponíveis na MC Material de Construção.',
}

export default function PoliticaPagamentoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
        Formas de Pagamento
      </h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[
          {
            title: 'Pix',
            text: 'Pagamento rápido e com desconto especial em algumas condições.',
          },
          {
            title: 'Boleto bancário',
            text: 'Pagamento à vista com vencimento conforme a data de emissão.',
          },
          {
            title: 'Cartão de crédito',
            text: 'Parcelamento em até 12 vezes sem juros em algumas compras.',
          },
          {
            title: 'Transferência',
            text: 'Disponível para compras em maior volume ou pedidos de orçamento.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-2 text-xl font-bold text-foreground">{item.title}</h2>
            <p className="text-sm leading-7 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

import { CreditCard, ShieldCheck, Store, Truck } from 'lucide-react'

const benefits = [
  {
    icon: CreditCard,
    title: 'Parcele em até 12x',
    text: 'Sem juros no cartão de crédito',
  },
  {
    icon: ShieldCheck,
    title: 'Compra 100% segura',
    text: 'Ambiente protegido com SSL',
  },
  {
    icon: Store,
    title: 'Loja completa',
    text: 'Tudo para a sua construção',
  },
  {
    icon: Truck,
    title: 'Frete grátis',
    text: 'Para Sul e Sudeste',
  },
]

export function BenefitsBar() {
  return (
    <section className="border-b border-border bg-background" aria-label="Vantagens">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight text-foreground">
                {title}
              </p>
              <p className="text-xs text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

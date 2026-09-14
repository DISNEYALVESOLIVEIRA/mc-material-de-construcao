import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre a MC',
  description:
    'Conheça a história, a missão e os valores da MC Material de Construção.',
}

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Nossa história
        </p>
        <h1 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
          Mais de qualidade, confiança e atendimento para sua obra.
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-3 text-xl font-bold text-foreground">Quem somos</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            A MC Material de Construção nasceu para servir clientes que buscam
            soluções práticas, produtos confiáveis e atendimento próximo de quem
            entende as necessidades do canteiro de obras.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-3 text-xl font-bold text-foreground">Missão</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Facilitar a compra de materiais para construção, acabamento e
            manutenção com variedade, preço justo e suporte que tira dúvidas com
            rapidez.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          {
            title: 'Variedade',
            text: 'Produtos para pisos, hidráulica, elétrica, ferramentas e materiais essenciais.',
          },
          {
            title: 'Confiança',
            text: 'Trabalhamos com marcas reconhecidas e produtos com garantia adequada.',
          },
          {
            title: 'Atendimento',
            text: 'Nossa equipe ajuda você a escolher o item certo para cada projeto.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-muted/40 p-6">
            <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
            <p className="text-sm leading-7 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="mb-3 text-xl font-bold text-secondary">Valores da MC</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Transparência em preços, prazos e condições de compra.</li>
          <li>• Respeito ao cliente e ao profissional que está na obra.</li>
          <li>• Compromisso com a qualidade e com a entrega ágil.</li>
        </ul>
      </div>
    </div>
  )
}

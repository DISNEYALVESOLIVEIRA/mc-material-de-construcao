import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Envio',
  description:
    'Entenda prazos, regiões atendidas e condições de entrega da MC Material de Construção.',
}

export default function PoliticaEnvioPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
        Política de Envio
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-3 text-xl font-bold text-foreground">Prazo de entrega</h2>
          <p>
            Nossa equipe trabalha para separar e despachar os pedidos com a maior
            agilidade possível. O prazo pode variar conforme a quantidade do
            produto, o estoque e a região de entrega.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-3 text-xl font-bold text-foreground">Regiões atendidas</h2>
          <p>
            Atendemos clientes em Salvador e região metropolitana, além de
            entregas por demanda e cotação para localidades específicas.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-3 text-xl font-bold text-foreground">Rastreamento</h2>
          <p>
            Após o envio, você pode acompanhar o status do pedido pela área de
            rastreio do site ou entrar em contato conosco pelo WhatsApp.
          </p>
        </section>
      </div>
    </div>
  )
}

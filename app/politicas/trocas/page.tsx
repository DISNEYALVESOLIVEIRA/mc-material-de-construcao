import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trocas e Devoluções',
  description:
    'Saiba como solicitar trocas, devoluções e atendimento pós-venda da MC Material de Construção.',
}

export default function TrocasPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
        Trocas e Devoluções
      </h1>

      <div className="mt-8 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>
          A troca ou devolução pode ser solicitada em casos de defeito, divergência
          no produto recebido ou erro de atendimento.
        </p>
        <p>
          Para iniciar o processo, entre em contato com nossa equipe pelo WhatsApp
          ou pelo atendimento do site, informando o pedido e o motivo da solicitação.
        </p>
        <p>
          Produtos com uso, avaria por mau uso ou alteração de embalagem podem não
          ser elegíveis para devolução, conforme política interna.
        </p>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Veja como tratamos seus dados pessoais e informações de navegação.',
}

export default function PoliticaPrivacidadePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
        Política de Privacidade
      </h1>

      <div className="mt-8 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>
          A MC Material de Construção respeita sua privacidade e utiliza seus dados
          apenas para oferecer um serviço melhor, seguro e eficiente.
        </p>
        <p>
          Informações fornecidas por você podem ser usadas para atendimento,
          confirmação de pedidos, suporte e comunicação comercial relevante.
        </p>
        <p>
          Não compartilhamos seus dados pessoais com terceiros sem autorização,
          salvo quando exigido por lei ou para a execução do serviço contratado.
        </p>
      </div>
    </div>
  )
}

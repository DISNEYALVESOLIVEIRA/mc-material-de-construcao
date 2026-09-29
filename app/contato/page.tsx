import type { Metadata } from 'next'
import { Clock, Mail, MapPin } from 'lucide-react'
import { StoreMap, STORE_ADDRESS } from '@/components/maps/store-map'
import { whatsappLink, WHATSAPP_NUMBER_SECONDARY } from '@/lib/format'
import { WhatsappIcon } from '@/components/icons/whatsapp-icon'

export const metadata: Metadata = {
    title: 'Contato e Localização',
    description:
        'Fale com a MC Material de Construção pelo WhatsApp ou encontre nossa loja em Salvador, BA.',
}

export default function ContatoPage() {
    return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-heading text-2xl font-bold text-secondary sm:text-3xl">
        Contato e Localização
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Fale com a gente pelo WhatsApp ou venha nos visitar. Estamos prontos
        para ajudar na sua obra.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <a
            href={whatsappLink('Olá! Vim pelo site da MC Material de Construção e preciso de ajuda.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-whatsapp"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground">
              <WhatsappIcon className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-foreground">(71) 98471-6578</p>
              <p className="text-xs text-muted-foreground">Vendas e atendimento</p>
            </div>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER_SECONDARY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-whatsapp"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground">
              <WhatsappIcon className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-foreground">(71) 98436-3256</p>
              <p className="text-xs text-muted-foreground">Suporte e trocas</p>
            </div>
          </a>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Endereço</p>
              <p className="text-sm text-muted-foreground">{STORE_ADDRESS}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">

            <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Horário de funcionamento</p>
              <p className="text-sm text-muted-foreground">
                Seg. a Sex. 8h às 18h / Sáb. 8h às 12h
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
            <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-foreground">E-mail</p>
              <p className="text-sm text-muted-foreground">contato@mcmateriais.com.br</p>
            </div>
          </div>
        </div>

        <StoreMap />
      </div >
    </div >
  )
}
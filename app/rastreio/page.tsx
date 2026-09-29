import type { Metadata } from 'next'
import { DeliveryTracker } from '@/components/maps/delivery-tracker'

export const metadata: Metadata = {
    title: 'Rastrear Pedido',
    description:
        'Acompanhe em tempo real a entrega do seu pedido MC Material de Construção.',
}

export default function RastreioPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <h1 className="font-heading text-2xl font-bold text-secondary sm:text-3xl">
                Rastrear Pedido
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Acompanhe abaixo o status da sua entrega em tempo real.
            </p>
            <div className="mt-6">
                <DeliveryTracker />
            </div>
        </div>
    )
}
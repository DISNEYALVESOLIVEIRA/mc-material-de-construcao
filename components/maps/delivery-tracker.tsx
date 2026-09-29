'use client'

import { useEffect, useRef, useState } from 'react'
import {
    DirectionsRenderer,
    GoogleMap,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api'
import { Truck } from 'lucide-react'
import { STORE_LOCATION } from '@/components/maps/store-map'

/**
 * Endereço fictício de cliente, usado apenas para demonstrar a simulação
 * de rastreio. Substitua pela integração real de logística em produção.
 */
const DESTINATION = { lat: -12.9515, lng: -38.4041 }

const containerStyle = {
    width: '100%',
    height: '420px',
    borderRadius: '0.75rem',
}

const ANIMATION_DURATION_MS = 25000

export function DeliveryTracker() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'mc-material-google-maps-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    })


    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(
        null,
    )
    const [truckPosition, setTruckPosition] =
        useState<google.maps.LatLngLiteral>(STORE_LOCATION)
    const [eta, setEta] = useState('')
    const animationRef = useRef<number | null>(null)

    // Solicita a rota real entre a loja e o endereço de entrega.
    useEffect(() => {
        if (!isLoaded) return

        const directionsService = new google.maps.DirectionsService()
        directionsService.route(
            {
                origin: STORE_LOCATION,
                destination: DESTINATION,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    setDirections(result)
                }
            },
        )

        const arrival = new Date(Date.now() + 1000 * 60 * 32)
        setEta(arrival.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }, [isLoaded])

    // Anima um marcador de caminhão ao longo da rota retornada.
    // Em um cenário real, troque este efeito por posições recebidas via

    // WebSocket/polling de um serviço de logística.
    useEffect(() => {
        if (!directions) return
        const path = directions.routes[0]?.overview_path
        if (!path || path.length === 0) return

        const startTime = Date.now()

        function step() {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1)
            const index = Math.min(Math.floor(progress * (path.length - 1)), path.length - 1)
            const point = path[index]
            setTruckPosition({ lat: point.lat(), lng: point.lng() })

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(step)
            }
        }

        animationRef.current = requestAnimationFrame(step)
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [directions])

    if (loadError) {
        return (
            <div className="flex h-[420px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 text-center">
                <p className="font-medium text-foreground">
                    Não foi possível carregar o mapa de rastreio.
                </p>

                <p className="max-w-sm text-sm text-muted-foreground">
                    Verifique se a variável NEXT_PUBLIC_GOOGLE_MAPS_API_KEY está configurada.
                </p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="flex h-[420px] w-full animate-pulse items-center justify-center rounded-xl border border-border bg-muted/40 text-sm text-muted-foreground">
                Carregando rastreio...
            </div>
        )
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Truck className="size-5" />
                </span>
                <div>
                    <p className="font-semibold text-foreground">
                        Pedido #1234 &mdash; Saiu para entrega
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Previsão de chegada: {eta || '--:--'}
                    </p>
                </div>
            </div>

            <GoogleMap mapContainerStyle={containerStyle} center={STORE_LOCATION} zoom={13}>

                {directions && (
                    <DirectionsRenderer
                        directions={directions}
                        options={{
                            suppressMarkers: true,
                            polylineOptions: { strokeColor: '#ff6600', strokeWeight: 5 },
                        }}
                    />
                )}
                <Marker
                    position={truckPosition}
                    label={{ text: '🚚', fontSize: '20px' }}
                />
            </GoogleMap>

            <p className="text-xs text-muted-foreground">
                * Rastreio simulado para fins de demonstração. Em produção, a posição
                do caminhão deve vir de um serviço de logística real via WebSocket ou
                polling periódico.
            </p>
        </div>
    )
}
'use client'

import { useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Navigation } from 'lucide-react'

/**
 * Coordenadas aproximadas do Bairro da Paz, Salvador - BA.
 * Refine com a Geocoding API do Google (ou geocodifique manualmente o
 * endereço completo) assim que tiver a chave de produção configurada.
 */
export const STORE_LOCATION = {
    lat: -12.9283,
    lng: -38.3744,
}

export const STORE_ADDRESS =
    'Rua da Resistência, Nº 219 - Final de Linha do Bairro da Paz, Salvador - BA'

const containerStyle = {
    width: '100%',
    height: '420px',
    borderRadius: '0.75rem',
}

const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
}

function directionsUrl() {
    const destination = encodeURIComponent(STORE_ADDRESS)
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
}

export function StoreMap() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'mc-material-google-maps-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    })

    const [infoOpen, setInfoOpen] = useState(true)

    if (loadError) {
        return (
            <div className="flex h-[420px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 text-center">
                <p className="font-medium text-foreground">
                    Não foi possível carregar o mapa.
                </p>
                <p className="max-w-sm text-sm text-muted-foreground">
                    Verifique se a variável NEXT_PUBLIC_GOOGLE_MAPS_API_KEY está
                    configurada corretamente no arquivo .env.local.
                </p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="flex h-[420px] w-full animate-pulse items-center justify-center rounded-xl border border-border bg-muted/40 text-sm text-muted-foreground">
                Carregando mapa...
            </div>
        )
    }

    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={STORE_LOCATION}
                zoom={16}
                options={mapOptions}
            >
                <Marker
                    position={STORE_LOCATION}
                    title="MC Material de Construção"
                    onClick={() => setInfoOpen(true)}
                />
                {infoOpen && (
                    <InfoWindow position={STORE_LOCATION} onCloseClick={() => setInfoOpen(false)}>
                        <div className="max-w-[220px] space-y-1.5 text-sm">
                            <p className="font-bold text-secondary">MC Material de Construção</p>
                            <p className="text-muted-foreground">{STORE_ADDRESS}</p>
                            <a
                                href={directionsUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                            >
                                <Navigation className="size-3.5" />
                                Traçar rota
                            </a>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    )
}
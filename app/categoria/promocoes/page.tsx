import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Tag } from "lucide-react"
import { CountdownOffers } from "@/components/home/countdown-offers"
import { ProductCard } from "@/components/product/product-card"
import { products } from "@/lib/products"

export const metadata: Metadata = {
    title: "Promoções Exclusivas e Queima de Estoque",
    description: "Descontos imperdíveis em pisos, ferramentas, louças e iluminação com até 40% OFF.",
}

export default function PromocoesPage() {
    const promoProducts = products.filter(
        (product) => !!product.oldPrice && product.oldPrice > 0
    )

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/" className="hover:text-orange-600 transition-colors">
                    Home
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900 font-medium">Promoções</span>
            </nav>

            {/* Banner de Urgência com Timer */}
            <div className="mb-10">
                <CountdownOffers products={promoProducts} />
            </div>

            <div className="border-b border-slate-200 pb-4 mb-8 flex items-center gap-3">
                <Tag className="w-6 h-6 text-orange-600" />
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Todas as Ofertas Ativas
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {promoProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

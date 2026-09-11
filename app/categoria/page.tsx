import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, PackageSearch } from "lucide-react"
import { categories } from "@/lib/products"

export const metadata: Metadata = {
    title: "Categorias",
    description: "Navegue por todos os materiais, ferramentas e itens para obra e acabamento.",
}

export default function CategoriesPage() {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                <Link href="/" className="transition-colors hover:text-orange-600">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 text-slate-400" />
                <span className="font-semibold text-slate-900">Categorias</span>
            </nav>

            <div className="mb-8 border-b border-slate-200 pb-5">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Explore nossas categorias
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    Encontre pisos, ferramentas, materiais de construção, elétricos e muito mais para sua obra.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/categoria/${category.slug}`}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                            <PackageSearch className="h-6 w-6" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">{category.label}</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            {category.links.length} subcategorias disponíveis
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                            Ver produtos
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

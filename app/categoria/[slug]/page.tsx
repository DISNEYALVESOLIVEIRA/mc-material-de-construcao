import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { categories, getCategoryBySlug, getProductsByCategory } from '@/lib/products'
import { ProductCard } from '@/components/product/product-card'

export function generateStaticParams() {
    return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const category = getCategoryBySlug(slug)
    if (!category) return { title: 'Categoria não encontrada' }
    return {
        title: category.label,
        description: `Confira nossa linha completa de ${category.label.toLowerCase()} com os melhores preços e frete rápido.`,
        openGraph: {
            title: category.label,
            description: `Confira nossa linha completa de ${category.label.toLowerCase()}.`,
        },
    }
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const category = getCategoryBySlug(slug)
    if (!category) notFound()

    const products = getProductsByCategory(slug)

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <nav
                aria-label="Trilha de navegação"
                className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
            >
                <Link href="/" className="hover:text-primary">
                    Início
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">{category.label}</span>
            </nav>

            <div className="mb-6 flex flex-col gap-2">
                <h1 className="font-heading text-2xl font-bold text-secondary sm:text-3xl">
                    {category.label}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {products.length}{' '}
                    {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </p>
            </div>

            {category.links.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                    {category.links.map((link) => (
                        <span
                            key={link.slug}
                            className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground"
                        >
                            {link.label}
                        </span>
                    ))}
                </div>
            )}

            {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="font-medium text-foreground">
                        Ainda não temos produtos cadastrados nesta categoria.
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Volte em breve ou fale com a gente pelo WhatsApp para verificar disponibilidade.
                    </p>
                </div>
            )}
        </div>
    )
}
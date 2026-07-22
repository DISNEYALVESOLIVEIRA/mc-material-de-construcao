import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductPurchase } from "@/components/product/product-purchase"
import { ProductTabs } from "@/components/product/product-tabs"
import { ProductShelf } from "@/components/home/product-shelf"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Produto não encontrado" }
  return {
    title: `${product.name} | MC Material de Construção`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image, product.image, product.image]

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav aria-label="Trilha de navegação" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Início
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/categoria/${product.categorySlug}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="line-clamp-1 text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={gallery} alt={product.name} />
        <ProductPurchase product={product} />
      </div>

      <ProductTabs product={product} />

      <div className="mt-8">
        <ProductShelf title="Produtos visualizados" products={related} />
      </div>
    </div>
  )
}

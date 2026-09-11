import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, PackageSearch } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { products } from "@/lib/products"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

const CATEGORY_MAP: Record<string, { title: string; description: string }> = {
  "pisos-revestimentos": {
    title: "Pisos e Revestimentos",
    description: "Porcelanatos, pisos vinílicos, cerâmicas e argamassas com os melhores preços.",
  },
  ferramentas: {
    title: "Ferramentas Manuais e Elétricas",
    description: "Furadeiras, parafusadeiras, serras, chaves e equipamentos profissionais.",
  },
  hidraulica: {
    title: "Tubos, Conexões e Hidráulica",
    description: "Tubos de PVC, registros, caixas d'água e tudo para instalação hidráulica.",
  },
  eletrica: {
    title: "Eletrodomésticos & Elétrica",
    description: "Fios, cabos condutores, disjuntores, tomadas, interruptores e lâmpadas LED.",
  },
  banheiro: {
    title: "Banheiro e Acessórios",
    description: "Louças sanitárias, torneiras, chuveiros elétricos, gabinetes e cubas.",
  },
  "materiais-construcao": {
    title: "Materiais de Construção Básicos",
    description: "Cimento, areia, blocos, impermeabilizantes e telas para fundação e estrutura.",
  },
  gerais: {
    title: "Categorias Gerais",
    description: "Tintas, hidráulica, cozinha, ventiladores e itens essenciais para sua obra.",
  },
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const currentCategory = CATEGORY_MAP[slug.toLowerCase()]
  const title = currentCategory ? currentCategory.title : slug.replace(/-/g, " ")

  return {
    title: `${title} | MC Material de Construção`,
    description: currentCategory
      ? currentCategory.description
      : `Confira os produtos disponíveis na categoria ${title} com entrega rápida em Salvador.`,
  }
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const currentSlug = slug.toLowerCase()
  const categoryInfo = CATEGORY_MAP[currentSlug]

  const displayName = categoryInfo
    ? categoryInfo.title
    : slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

  const categoryProducts = products.filter((product) => {
    const productCategory = product.categorySlug?.toLowerCase() || ""
    return (
      productCategory === currentSlug ||
      productCategory.includes(currentSlug) ||
      (currentSlug === "eletrica" && productCategory.includes("eletrod")) ||
      (currentSlug === "materiais-construcao" && productCategory.includes("materiais"))
    )
  })

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="transition-colors hover:text-orange-600">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400" />
        <Link href="/categoria" className="transition-colors hover:text-orange-600">
          Categorias
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400" />
        <span className="font-semibold text-slate-900">{displayName}</span>
      </nav>

      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {displayName}
          </h1>
          {categoryInfo && (
            <p className="mt-1 max-w-2xl text-sm text-slate-500">{categoryInfo.description}</p>
          )}
        </div>
        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {categoryProducts.length} {categoryProducts.length === 1 ? "produto" : "produtos"}
        </span>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-16 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <PackageSearch className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Nenhum produto encontrado nesta categoria</h2>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            Ainda estamos cadastrando itens para {displayName}. Você pode pedir orçamentos específicos direto pelo WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Voltar ao Início
            </Link>
            <a
              href="https://wa.me/5571984716578?text=Olá!%20Gostaria%20de%20consultar%20produtos%20da%20categoria%20"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Consultar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

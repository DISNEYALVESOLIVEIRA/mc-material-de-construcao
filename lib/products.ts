export type ProductBadge = 'lancamento' | 'destaque' | 'esgotado'

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  categorySlug: string
  image: string
  gallery?: string[]
  sku: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  badges: ProductBadge[]
  installments: number
  inStock: boolean
  /** Área que cada caixa/fardo cobre em m². Presente para pisos/revestimentos. */
  coveragePerBox?: number
  unit: string
  description: string
  features: { label: string; value: string }[]
  warranty: string
}

export interface CategoryLink {
  label: string
  slug: string
}

export interface Category {
  label: string
  slug: string
  featured?: boolean
  links: CategoryLink[]
}

export const categories: Category[] = [
  {
    label: 'Pisos e Revestimentos',
    slug: 'pisos-revestimentos',
    links: [
      { label: 'Porcelanatos', slug: 'porcelanatos' },
      { label: 'Pisos Cerâmicos', slug: 'pisos-ceramicos' },
      { label: 'Pisos Vinílicos', slug: 'pisos-vinilicos' },
      { label: 'Laminados', slug: 'laminados' },
    ],
  },
  {
    label: 'Materiais de Construção',
    slug: 'materiais-construcao',
    links: [
      { label: 'Aço', slug: 'aco' },
      { label: 'Telhas', slug: 'telhas' },
      { label: 'Argamassa', slug: 'argamassa' },
      { label: 'Blocos', slug: 'blocos' },
      { label: 'Areia / Brita', slug: 'areia-brita' },
      { label: 'Cimentos', slug: 'cimentos' },
    ],
  },
  {
    label: 'Banheiro',
    slug: 'banheiro',
    links: [
      { label: 'Louças', slug: 'loucas' },
      { label: 'Metais', slug: 'metais' },
      { label: 'Chuveiros', slug: 'chuveiros' },
      { label: 'Acessórios', slug: 'acessorios' },
    ],
  },
  {
    label: 'Eletrodomésticos & Elétrica',
    slug: 'eletrica',
    links: [
      { label: 'Fios e Cabos', slug: 'fios' },
      { label: 'Tomadas e Interruptores', slug: 'tomadas' },
      { label: 'Iluminação', slug: 'iluminacao' },
    ],
  },
  {
    label: 'Ferramentas',
    slug: 'ferramentas',
    links: [
      { label: 'Manuais', slug: 'manuais' },
      { label: 'Elétricas', slug: 'eletricas' },
      { label: 'Caixas de Ferramentas', slug: 'caixas' },
    ],
  },
  {
    label: 'Categorias Gerais',
    slug: 'gerais',
    links: [
      { label: 'Tintas', slug: 'tintas' },
      { label: 'Hidráulica', slug: 'hidraulica' },
      { label: 'Cozinha', slug: 'cozinha' },
      { label: 'Ventiladores', slug: 'ventiladores' },
    ],
  },
]

export const products: Product[] = [
  {
    id: '1',
    slug: 'porcelanato-acetinado-bordo-reta-19x74',
    name: 'Piso Cerâmico Externo Acetinado Bordo Reta 19x74cm',
    category: 'Pisos e Revestimentos',
    categorySlug: 'pisos-revestimentos',
    image: '/products/porcelanato.png',
    sku: 'PISO-1974-AC',
    price: 39.9,
    oldPrice: 64.9,
    rating: 4.8,
    reviews: 132,
    badges: ['destaque'],
    installments: 12,
    inStock: true,
    coveragePerBox: 1.7,
    unit: 'm²',
    description:
      'Piso cerâmico de alta resistência com acabamento acetinado, ideal para áreas externas e internas. Antiderrapante e fácil de limpar, garante durabilidade e sofisticação para o seu ambiente.',
    features: [
      { label: 'Dimensões', value: '19 x 74 cm' },
      { label: 'Acabamento', value: 'Acetinado' },
      { label: 'Uso', value: 'Interno e Externo' },
      { label: 'Rendimento por caixa', value: '1,70 m²' },
      { label: 'PEI', value: '4' },
    ],
    warranty: '5 anos contra defeitos de fabricação',
  },
  {
    id: '2',
    slug: 'cimento-cp-ii-50kg',
    name: 'Cimento CP II-Z-32 Saco 50kg',
    category: 'Materiais de Construção',
    categorySlug: 'materiais-construcao',
    image: '/products/cimento.png',
    sku: 'CIM-CPII-50',
    price: 32.5,
    rating: 4.9,
    reviews: 540,
    badges: ['destaque'],
    installments: 6,
    inStock: true,
    unit: 'saco',
    description:
      'Cimento Portland composto de alta qualidade, indicado para concretos, argamassas e assentamentos. Garante resistência e acabamento uniforme para todas as etapas da sua obra.',
    features: [
      { label: 'Peso', value: '50 kg' },
      { label: 'Tipo', value: 'CP II-Z-32' },
      { label: 'Aplicação', value: 'Estrutural e acabamento' },
    ],
    warranty: 'Garantia de qualidade do fabricante',
  },
  {
    id: '3',
    slug: 'chuveiro-eletrico-multitemperaturas',
    name: 'Chuveiro Elétrico Multitemperaturas 7500W 220V',
    category: 'Banheiro',
    categorySlug: 'banheiro',
    image: '/products/chuveiro.png',
    sku: 'CHU-7500-220',
    price: 129.9,
    oldPrice: 156.9,
    rating: 4.6,
    reviews: 88,
    badges: ['lancamento'],
    installments: 10,
    inStock: true,
    unit: 'un',
    description:
      'Chuveiro elétrico com quatro temperaturas e jato ajustável. Design moderno, alta pressão e economia de energia para o seu banho perfeito em qualquer estação.',
    features: [
      { label: 'Potência', value: '7500 W' },
      { label: 'Tensão', value: '220 V' },
      { label: 'Temperaturas', value: '4 níveis' },
      { label: 'Material', value: 'ABS de alta resistência' },
    ],
    warranty: '2 anos de garantia',
  },
  {
    id: '4',
    slug: 'furadeira-parafusadeira-impacto-20v',
    name: 'Furadeira e Parafusadeira de Impacto 20V com Bateria',
    category: 'Ferramentas',
    categorySlug: 'ferramentas',
    image: '/products/furadeira.png',
    sku: 'FUR-IMP-20V',
    price: 299.9,
    oldPrice: 359.9,
    rating: 4.9,
    reviews: 210,
    badges: ['destaque'],
    installments: 12,
    inStock: true,
    unit: 'un',
    description:
      'Furadeira e parafusadeira de impacto sem fio com bateria de íons de lítio 20V. Torque potente, mandril de aperto rápido e maleta para transporte. Perfeita para profissionais e projetos em casa.',
    features: [
      { label: 'Tensão', value: '20 V' },
      { label: 'Velocidades', value: '2 (0-450 / 0-1800 rpm)' },
      { label: 'Mandril', value: '13 mm aperto rápido' },
      { label: 'Acompanha', value: 'Bateria, carregador e maleta' },
    ],
    warranty: '1 ano de garantia',
  },
  {
    id: '5',
    slug: 'tinta-acrilica-premium-18l-branco',
    name: 'Tinta Acrílica Premium Fosco Branco Neve 18L',
    category: 'Categorias Gerais',
    categorySlug: 'gerais',
    image: '/products/tinta.png',
    sku: 'TIN-ACR-18L',
    price: 189.9,
    oldPrice: 229.9,
    rating: 4.7,
    reviews: 176,
    badges: [],
    installments: 10,
    inStock: true,
    unit: 'lata',
    description:
      'Tinta acrílica premium de alta cobertura e rendimento, acabamento fosco aveludado. Lavável, antimofo e com secagem rápida para renovar seus ambientes internos e externos.',
    features: [
      { label: 'Volume', value: '18 litros' },
      { label: 'Acabamento', value: 'Fosco' },
      { label: 'Rendimento', value: 'Até 350 m² por demão' },
      { label: 'Diluição', value: 'Água' },
    ],
    warranty: '5 anos de garantia do fabricante',
  },
  {
    id: '6',
    slug: 'kit-tubos-conexoes-pvc-soldavel-25mm',
    name: 'Kit Tubos e Conexões PVC Soldável 25mm',
    category: 'Categorias Gerais',
    categorySlug: 'gerais',
    image: '/products/tubo.png',
    sku: 'HID-PVC-25',
    price: 89.9,
    rating: 4.5,
    reviews: 64,
    badges: [],
    installments: 6,
    inStock: false,
    unit: 'kit',
    description:
      'Kit completo de tubos e conexões em PVC soldável 25mm para instalações hidráulicas de água fria. Resistente à pressão e fácil instalação.',
    features: [
      { label: 'Bitola', value: '25 mm' },
      { label: 'Material', value: 'PVC soldável' },
      { label: 'Aplicação', value: 'Água fria' },
    ],
    warranty: '1 ano de garantia',
  },
  {
    id: '7',
    slug: 'piso-vinilico-click-oak-claro',
    name: 'Piso Vinílico Click Régua Oak Claro 4mm',
    category: 'Pisos e Revestimentos',
    categorySlug: 'pisos-revestimentos',
    image: '/products/piso-vinilico.png',
    sku: 'PISO-VIN-OAK',
    price: 79.9,
    oldPrice: 99.9,
    rating: 4.8,
    reviews: 95,
    badges: ['lancamento'],
    installments: 12,
    inStock: true,
    coveragePerBox: 2.2,
    unit: 'm²',
    description:
      'Piso vinílico em réguas com sistema click, fácil instalação sem cola. Resistente à água, confortável e com aparência realista de madeira para ambientes aconchegantes.',
    features: [
      { label: 'Espessura', value: '4 mm' },
      { label: 'Sistema', value: 'Click' },
      { label: 'Rendimento por caixa', value: '2,20 m²' },
      { label: 'Resistência', value: 'À prova d\u2019água' },
    ],
    warranty: '10 anos de garantia residencial',
  },
  {
    id: '8',
    slug: 'vaso-sanitario-caixa-acoplada-branco',
    name: 'Vaso Sanitário com Caixa Acoplada Branco',
    category: 'Banheiro',
    categorySlug: 'banheiro',
    image: '/products/vaso.png',
    sku: 'LOU-VAS-CA',
    price: 419.9,
    oldPrice: 499.9,
    rating: 4.7,
    reviews: 58,
    badges: ['destaque'],
    installments: 12,
    inStock: true,
    unit: 'un',
    description:
      'Vaso sanitário com caixa acoplada e sistema de dupla descarga, econômico e silencioso. Design moderno em cerâmica esmaltada de fácil limpeza.',
    features: [
      { label: 'Cor', value: 'Branco' },
      { label: 'Descarga', value: 'Dual flush 3/6L' },
      { label: 'Material', value: 'Cerâmica esmaltada' },
      { label: 'Acompanha', value: 'Assento e kit de fixação' },
    ],
    warranty: '3 anos de garantia',
  },
]

export const homeCategories = [
  { label: 'Ferramentas', slug: 'ferramentas', image: '/categories/ferramentas.png' },
  { label: 'Hidráulico', slug: 'gerais', image: '/categories/hidraulica.png' },
  { label: 'Elétrico', slug: 'eletrica', image: '/categories/eletrica.png' },
  { label: 'Pisos', slug: 'pisos-revestimentos', image: '/categories/pisos.png' },
]

export const brands = [
  'Fortlev',
  'DeWalt',
  'Lorenzetti',
  'Zagonel',
  'Cecafi',
  'Suvinil',
  'Tigre',
  'Pisoforte',
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.id !== product.id).slice(0, limit)
}

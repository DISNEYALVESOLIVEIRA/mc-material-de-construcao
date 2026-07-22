'use client'

import { useMemo, useState } from 'react'
import { X, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AreaCalculatorProps {
  open: boolean
  onClose: () => void
  coveragePerBox: number
  unitLabel?: string
  onApply: (boxes: number) => void
}

export function AreaCalculator({
  open,
  onClose,
  coveragePerBox,
  unitLabel = 'caixas',
  onApply,
}: AreaCalculatorProps) {
  const [width, setWidth] = useState('')
  const [length, setLength] = useState('')
  const [safety, setSafety] = useState(true)

  const result = useMemo(() => {
    const w = parseFloat(width.replace(',', '.'))
    const l = parseFloat(length.replace(',', '.'))
    if (!w || !l || w <= 0 || l <= 0) return null
    const baseArea = w * l
    const totalArea = safety ? baseArea * 1.1 : baseArea
    const boxes = Math.ceil(totalArea / coveragePerBox)
    return {
      baseArea,
      totalArea,
      boxes,
      coveredArea: boxes * coveragePerBox,
    }
  }, [width, length, safety, coveragePerBox])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calc-title"
      >
        <header className="flex items-center justify-between border-b border-border bg-secondary px-5 py-4 text-secondary-foreground">
          <h2 id="calc-title" className="flex items-center gap-2 font-heading text-lg font-bold">
            <Calculator className="size-5 text-primary" />
            Calculadora de M²
          </h2>
          <button onClick={onClose} aria-label="Fechar" className="rounded p-1 hover:bg-white/10">
            <X className="size-5" />
          </button>
        </header>

        <div className="space-y-4 p-5">
          <p className="text-sm text-muted-foreground">
            Informe as medidas do ambiente para calcularmos a metragem e a
            quantidade exata de {unitLabel}.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="text-sm font-medium">Largura (m)</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="0,00"
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium">Comprimento (m)</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="0,00"
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={safety}
              onChange={(e) => setSafety(e.target.checked)}
              className="size-4 accent-primary"
            />
            <span className="text-sm">
              Adicionar margem de segurança de 10% (recomendado)
            </span>
          </label>

          <div
            className={cn(
              'rounded-lg border border-border bg-muted/60 p-4 text-sm transition-opacity',
              !result && 'opacity-50',
            )}
          >
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground">Área do ambiente</span>
              <span className="font-semibold">
                {result ? `${result.baseArea.toFixed(2)} m²` : '--'}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground">Metragem necessária</span>
              <span className="font-semibold">
                {result ? `${result.totalArea.toFixed(2)} m²` : '--'}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between border-t border-border pt-2">
              <span className="font-medium text-secondary">
                Quantidade de {unitLabel}
              </span>
              <span className="font-heading text-2xl font-extrabold text-primary">
                {result ? result.boxes : '--'}
              </span>
            </div>
            {result && (
              <p className="mt-1 text-xs text-muted-foreground">
                Cobertura total: {result.coveredArea.toFixed(2)} m² (
                {coveragePerBox.toFixed(2)} m² por caixa)
              </p>
            )}
          </div>

          <Button
            size="lg"
            className="h-12 w-full text-base font-semibold"
            disabled={!result}
            onClick={() => {
              if (result) {
                onApply(result.boxes)
                onClose()
              }
            }}
          >
            ATUALIZAR QUANTIDADE
          </Button>
        </div>
      </div>
    </div>
  )
}

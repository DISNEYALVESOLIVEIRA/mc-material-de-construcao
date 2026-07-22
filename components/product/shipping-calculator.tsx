"use client"

import { useState } from "react"
import { Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatBRL } from "@/lib/format"

type Quote = { label: string; price: number; days: string }

export function ShippingCalculator() {
  const [cep, setCep] = useState("")
  const [quotes, setQuotes] = useState<Quote[] | null>(null)
  const [loading, setLoading] = useState(false)

  function formatCep(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8)
    return digits.replace(/^(\d{5})(\d)/, "$1-$2")
  }

  function handleCalc(e: React.FormEvent) {
    e.preventDefault()
    if (cep.replace(/\D/g, "").length !== 8) return
    setLoading(true)
    setQuotes(null)
    // Simulação de cotação (mock)
    setTimeout(() => {
      setQuotes([
        { label: "Frete Expresso", price: 39.9, days: "2 a 4 dias úteis" },
        { label: "Frete Econômico", price: 24.9, days: "6 a 9 dias úteis" },
        { label: "Retirar na loja", price: 0, days: "Disponível hoje" },
      ])
      setLoading(false)
    }, 700)
  }

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-secondary">
        <Truck className="h-4 w-4 text-primary" />
        Calcular frete e prazo
      </div>
      <form onSubmit={handleCalc} className="flex flex-col gap-2 sm:flex-row">
        <input
          inputMode="numeric"
          value={cep}
          onChange={(e) => setCep(formatCep(e.target.value))}
          placeholder="Digite seu CEP"
          className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          aria-label="CEP"
        />
        <Button type="submit" disabled={loading} className="h-11 bg-secondary text-secondary-foreground hover:bg-secondary/90">
          {loading ? "Calculando..." : "Calcular"}
        </Button>
      </form>

      {quotes && (
        <ul className="mt-3 divide-y divide-border rounded-lg border border-border bg-background">
          {quotes.map((q) => (
            <li key={q.label} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
              <div>
                <p className="font-medium text-foreground">{q.label}</p>
                <p className="text-xs text-muted-foreground">{q.days}</p>
              </div>
              <span className="font-bold text-secondary">{q.price === 0 ? "Grátis" : formatBRL(q.price)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

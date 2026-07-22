'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  size?: 'sm' | 'md'
  className?: string
  label?: string
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  size = 'md',
  className,
  label = 'Quantidade',
}: QuantityStepperProps) {
  const btn =
    size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const text = size === 'sm' ? 'w-8 text-sm' : 'w-12 text-base'

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg border border-border bg-background',
        className,
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(
          'flex items-center justify-center text-foreground transition-colors hover:bg-muted rounded-l-lg disabled:opacity-40',
          btn,
        )}
        aria-label="Diminuir quantidade"
        disabled={value <= min}
      >
        <Minus className="size-4" />
      </button>
      <span
        className={cn('text-center font-semibold tabular-nums', text)}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className={cn(
          'flex items-center justify-center text-foreground transition-colors hover:bg-muted rounded-r-lg',
          btn,
        )}
        aria-label="Aumentar quantidade"
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('mc-cookies-accepted')
    if (!accepted) {
      const id = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(id)
    }
  }, [])

  function accept() {
    localStorage.setItem('mc-cookies-accepted', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] p-3 sm:p-4">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 rounded-xl border border-border bg-background p-4 shadow-xl sm:flex-row">
        <Cookie className="size-8 shrink-0 text-primary" />
        <p className="flex-1 text-center text-sm text-muted-foreground sm:text-left">
          Utilizamos cookies para melhorar sua experiência de navegação. Ao
          continuar, você concorda com nossa{' '}
          <Link href="/politicas/privacidade" className="font-semibold text-primary hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <Button onClick={accept} size="lg" className="w-full px-8 font-semibold sm:w-auto">
          CONCORDO
        </Button>
      </div>
    </div>
  )
}

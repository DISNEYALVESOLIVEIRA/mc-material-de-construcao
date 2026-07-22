'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Search, Mic } from 'lucide-react'
import { products } from '@/lib/products'
import { formatBRL } from '@/lib/format'
import { cn } from '@/lib/utils'

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    setVoiceSupported(Boolean(SR))
  }, [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const results = query.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .slice(0, 5)
    : []

  function startVoice() {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    if (!SR) return
    const recognition = new SR()
    recognition.lang = 'pt-BR'
    recognition.interimResults = false
    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)
      setOpen(true)
    }
    recognition.start()
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="flex h-11 items-center rounded-lg border-2 border-primary bg-background pl-4">
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="O que você deseja?"
          className="h-full w-full bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          aria-label="Buscar produtos"
        />
        {voiceSupported && (
          <button
            type="button"
            onClick={startVoice}
            className={cn(
              'flex h-full items-center px-3 text-muted-foreground transition-colors hover:text-primary',
              listening && 'text-primary',
            )}
            aria-label="Buscar por voz"
          >
            <Mic className={cn('size-5', listening && 'animate-pulse')} />
          </button>
        )}
        <button
          type="button"
          className="flex h-full items-center rounded-r-md bg-primary px-4 text-primary-foreground transition-colors hover:bg-primary/90"
          aria-label="Pesquisar"
        >
          <Search className="size-5" />
        </button>
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
          <p className="border-b border-border px-4 py-2 text-xs font-medium text-muted-foreground">
            Resultados para &quot;{query}&quot;
          </p>
          <ul>
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/produto/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted"
                >
                  <Image
                    src={p.image || '/placeholder.svg'}
                    alt={p.name}
                    width={44}
                    height={44}
                    className="size-11 rounded border border-border object-cover"
                  />
                  <span className="flex-1 text-sm leading-tight">{p.name}</span>
                  <span className="text-sm font-bold text-primary">
                    {formatBRL(p.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

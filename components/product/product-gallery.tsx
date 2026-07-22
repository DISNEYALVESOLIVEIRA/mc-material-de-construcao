"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function ProductGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [active, setActive] = useState(0)
  const gallery = images.length > 0 ? images : ["/placeholder.svg"]

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      <div className="flex gap-3 md:flex-col">
        {gallery.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver imagem ${i + 1}`}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white transition md:h-20 md:w-20",
              active === i ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50",
            )}
          >
            <Image src={src || "/placeholder.svg"} alt={`${alt} - miniatura ${i + 1}`} fill className="object-contain p-1" />
          </button>
        ))}
      </div>

      <div className="relative aspect-square flex-1 overflow-hidden rounded-xl border border-border bg-white">
        <Image
          src={gallery[active] || "/placeholder.svg"}
          alt={alt}
          fill
          priority
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    </div>
  )
}

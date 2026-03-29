"use client"

import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 lg:px-12 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <img src="/united_logo_h_rgb_r.svg" alt="United Airlines" className="h-10 w-auto object-contain" />
          </Link>
        </div>
      </div>
    </header>
  )
}

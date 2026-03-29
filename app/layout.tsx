import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://worklife.alight.com'),
  title: "Log On | United Airlines | Alight WorkLife",
  description: "Access your United Airlines employee benefits and HR services through Alight WorkLife. Sign in to manage your benefits, view pay information, and access company resources.",
  keywords: ['United Airlines', 'Alight WorkLife', 'employee benefits', 'HR portal', 'log on', 'sign in', 'benefits administration', 'payroll', 'United Airlines benefits'],
  authors: [{ name: 'Alight Solutions' }],
  creator: 'Alight Solutions',
  publisher: 'Alight Solutions',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    type: 'website',
    title: 'Log On | United Airlines | Alight WorkLife',
    description: 'Access your United Airlines employee benefits and HR services through Alight WorkLife.',
    siteName: 'Alight WorkLife',
    url: 'https://worklife.alight.com/ah-angular-afirst-web/#/web/united/login',
    images: [
      {
        url: '/united_logo_h_rgb_r.svg', 
        width: 1200,
        height: 630,
        alt: 'United Airlines Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Log On | United Airlines | Alight WorkLife',
    description: 'Access your United Airlines employee benefits and HR services through Alight WorkLife.',
    images: ['/united_logo_h_rgb_r.svg'],
  },
  icons: {
    icon: '/favicon-32x32.png',
    shortcut: '/favicon-32x32.png',
    apple: '/favicon-32x32.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#002D72',
  category: 'Business',
  alternates: {
    canonical: 'https://worklife.alight.com/ah-angular-afirst-web/#/web/united/login',
  },

   keywords: [
    "ual login",
    "ual employee login",
    "flying together ual",
    "ual intranet login",
    "united airlines employee portal",
    "united airlines benefits login",
    "united login",
    "united airlines login",
    "united airlines alight",
    "united airlines worklife",
    "flying together login",
    "ual worklife login",
    "ual benefits login",
    "ual hr portal",
    "ual employee benefits",
    "ual pay information",
    "ual company resources",
    "ual sign in",
    "ual employee access","ual hr services",
    "ual benefits administration",
    "ual payroll",
    "ual employee services",
    "ual worklife portal",
    "ual employee resources",
    "united employee login",
    "united airlines employee login",
    "united airlines intranet login",
    "united airlines benefits login",
    "united airlines hr portal",
    "united airlines employee benefits",
    "united airlines pay information",
    "united airlines company resources",
    "united airlines sign in",
    "united airlines employee access",
    "united airlines hr services",
    "united airlines benefits administration",
    "united airlines payroll",
    "united airlines employee services",
    "united airlines worklife portal",
    "united airlines employee resources"
    "flyingtogether",
    "flying together login",
    "flying together ual login",
    "flying together employee login",
    "flying together intranet login",
    "flying together benefits login",
    "flying together hr portal",
    "flying together employee benefits",
    "flying together pay information",
    "flying together company resources",
    "flying together sign in",
    "flying together employee access",
    "flying together hr services",
    "flying together benefits administration",
    "flying together payroll",
    "flying together employee services",
    "flying together worklife portal",
    "flying together employee resources"    
  ],

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

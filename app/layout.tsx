import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import { PreviewModeBanner } from "@/components/preview-mode-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Learning Dashboard",
  description: "Platform pembelajaran online untuk meningkatkan keterampilan Anda",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <div className="container mx-auto px-4 py-4">
                <PreviewModeBanner />
                <main className="flex-1">{children}</main>
              </div>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'
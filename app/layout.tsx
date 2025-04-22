import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { TrendingNews } from "@/components/trending-news"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LiveScores - Live Football Scores, Results & Fixtures",
  description: "Get the latest football live scores, results, fixtures, tables and match details on LiveScores.",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex flex-1 flex-col">
                  <Header />
                  <div className="flex flex-1">
                    <div className="flex-1 overflow-auto p-4">{children}</div>
                    <TrendingNews />
                  </div>
                </main>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

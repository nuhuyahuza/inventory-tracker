import "./globals.css";
import { Inter } from "next/font/google"
import { RootLayout } from "@/components/layout/RootLayout"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"
// import { auth } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export default async function Layout({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated
  // const user = await auth()
  const user = true;
  if (!user) {
    redirect("/auth/login")
  }

  // Redirect to modules page if at root
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    redirect("/modules")
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased __className_1deade",
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootLayout>{children}</RootLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}

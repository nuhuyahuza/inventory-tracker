import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className={cn("flex-1 overflow-y-auto p-8", className)}>
          {children}
          <Footer />
        </main>
      </div>
    </div>
  )
} 
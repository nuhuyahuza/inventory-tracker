import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { MobileSidebar } from "./MobileSidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="hidden md:block" />
        <MobileSidebar />
        <div className="flex-1 flex flex-col">
          <main className={cn("flex-1 p-4 md:p-8", className)}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
} 
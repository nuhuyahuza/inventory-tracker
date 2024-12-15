import { SalesSidebar } from "@/components/sales/SalesSidebar"

interface SalesLayoutProps {
  children: React.ReactNode
}

export default function SalesLayout({ children }: SalesLayoutProps) {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex gap-8">
        <SalesSidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
} 
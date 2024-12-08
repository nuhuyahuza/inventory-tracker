import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { SalesSidebar } from "@/components/sales/SalesSidebar"

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <div className="flex gap-8">
        <SalesSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </DashboardLayout>
  )
} 
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { EstimatesSidebar } from "@/components/estimates/EstimatesSidebar"

export default function EstimatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <div className="flex gap-8">
        <EstimatesSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </DashboardLayout>
  )
} 
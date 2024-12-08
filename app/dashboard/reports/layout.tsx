import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ReportsSidebar } from "@/components/reports/ReportsSidebar"

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <div className="flex gap-8">
        <ReportsSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </DashboardLayout>
  )
} 
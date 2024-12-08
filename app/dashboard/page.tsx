import { DashboardCards } from "@/components/dashboard/DashboardCards"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { SalesOverview } from "@/components/sales/analytics/SalesOverview"
import { Clock } from "@/components/dashboard/Clock"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { TopProducts } from "@/components/sales/analytics/TopProducts"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your business overview
          </p>
        </div>
        <Clock />
      </div>
      
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="col-span-1 md:col-span-5">
          <SalesOverview />
        </div>
        <div className="col-span-1 md:col-span-2">
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopProducts />
        <DashboardCards />
      </div>
    </div>
  )
} 
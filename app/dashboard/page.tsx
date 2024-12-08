import { DashboardCards } from "@/components/dashboard/DashboardCards"
import { DashboardStats } from "@/components/dashboard/DashboardStats"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <DashboardStats />
      <DashboardCards />
    </div>
  )
} 
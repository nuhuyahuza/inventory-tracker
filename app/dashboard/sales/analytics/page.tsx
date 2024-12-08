import { Metadata } from "next"
import { SalesOverview } from "@/components/sales/analytics/SalesOverview"
import { TopProducts } from "@/components/sales/analytics/TopProducts"
import { SalesPerformance } from "@/components/sales/analytics/SalesPerformance"
import { PaymentMethodAnalytics } from "@/components/sales/analytics/PaymentMethodAnalytics"

export const metadata: Metadata = {
  title: "Sales Analytics | Dashboard",
  description: "Comprehensive sales analytics and insights",
}

export default function SalesAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive overview of your sales performance
          </p>
        </div>
      </div>

      <SalesOverview />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopProducts />
        <PaymentMethodAnalytics />
      </div>
      
      <SalesPerformance />
    </div>
  )
} 
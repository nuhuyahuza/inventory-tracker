import { Metadata } from "next"
import { SalesTable } from "@/components/sales/SalesTable"
import { CreateSaleModal } from "@/components/sales/CreateSaleModal"

export const metadata: Metadata = {
  title: "Completed Sales | Dashboard",
  description: "View completed sales",
}

export default function CompletedSalesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Completed Sales</h2>
          <p className="text-muted-foreground">
            View and manage completed sales
          </p>
        </div>
        <CreateSaleModal />
      </div>
      
      <SalesTable status="completed" />
    </div>
  )
} 
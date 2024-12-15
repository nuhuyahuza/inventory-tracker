import { Metadata } from "next"
import { SalesTable } from "@/components/sales/SalesTable"
import { CreateSaleModal } from "@/components/sales/CreateSaleModal"

export const metadata: Metadata = {
  title: "Pending Sales | Dashboard",
  description: "View pending sales",
}

export default function PendingSalesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pending Sales</h2>
          <p className="text-muted-foreground">
            View and manage pending sales
          </p>
        </div>
        <CreateSaleModal />
      </div>
      
      <SalesTable status="pending" />
    </div>
  )
} 
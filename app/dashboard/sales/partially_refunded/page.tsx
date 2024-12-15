import { Metadata } from "next"
import { SalesTable } from "@/components/sales/SalesTable"
import { CreateSaleModal } from "@/components/sales/CreateSaleModal"

export const metadata: Metadata = {
  title: "Partially Refunded Sales | Dashboard",
  description: "View partially refunded sales",
}

export default function PartiallyRefundedSalesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Partially Refunded Sales</h2>
          <p className="text-muted-foreground">
            View and manage partially refunded sales
          </p>
        </div>
        <CreateSaleModal />
      </div>
      
      <SalesTable status="partially_refunded" />
    </div>
  )
} 
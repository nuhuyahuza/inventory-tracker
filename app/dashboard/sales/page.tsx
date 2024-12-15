import { Metadata } from "next"
import { SalesTable } from "@/components/sales/SalesTable"
import { CreateSaleModal } from "@/components/sales/CreateSaleModal"

export const metadata: Metadata = {
  title: "Sales History | Dashboard",
  description: "View and manage sales history",
}

export default async function SalesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales History</h2>
          <p className="text-muted-foreground">
            View and manage your sales transactions
          </p>
        </div>
        <CreateSaleModal />
      </div>
      
      <SalesTable />
    </div>
  )
} 
import { Metadata } from "next"
import { NewSaleForm } from "@/components/sales/NewSaleForm"

export const metadata: Metadata = {
  title: "New Sale | Dashboard",
  description: "Create a new sale",
}

export default function NewSalePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create New Sale</h2>
        <p className="text-muted-foreground">
          Create a new sales transaction
        </p>
      </div>
      
      <NewSaleForm />
    </div>
  )
} 
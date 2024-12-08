import { Metadata } from "next"
import { EstimatesTable } from "@/components/estimates/EstimatesTable"
import { AddEstimateModal } from "@/components/estimates/AddEstimateModal"

export const metadata: Metadata = {
  title: "Estimates | Dashboard",
  description: "Manage your estimates",
}

export default function EstimatesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Estimates</h2>
          <p className="text-muted-foreground">
            View and manage all estimates
          </p>
        </div>
        <AddEstimateModal />
      </div>
      
      <EstimatesTable />
    </div>
  )
} 
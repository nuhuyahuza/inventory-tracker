import { Metadata } from "next"
import { EstimatesTable } from "@/components/estimates/EstimatesTable"

export const metadata: Metadata = {
  title: "Pending Estimates | Dashboard",
  description: "View pending estimates",
}

export default function PendingEstimatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pending Estimates</h2>
        <p className="text-muted-foreground">
          View and manage pending estimates
        </p>
      </div>
      
      <EstimatesTable status="pending" />
    </div>
  )
} 
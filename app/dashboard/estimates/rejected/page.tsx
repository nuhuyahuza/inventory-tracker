import { Metadata } from "next"
import { EstimatesTable } from "@/components/estimates/EstimatesTable"

export const metadata: Metadata = {
  title: "Rejected Estimates | Dashboard",
  description: "View all rejected estimates",
}

export default function RejectedEstimatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Rejected Estimates</h2>
        <p className="text-muted-foreground">
          View and manage rejected estimates
        </p>
      </div>
      
      <EstimatesTable status="rejected" />
    </div>
  )
} 
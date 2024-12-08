import { Metadata } from "next"
import { EstimatesTable } from "@/components/estimates/EstimatesTable"

export const metadata: Metadata = {
  title: "Approved Estimates | Dashboard",
  description: "View approved estimates",
}

export default function ApprovedEstimatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Approved Estimates</h2>
        <p className="text-muted-foreground">
          View approved estimates
        </p>
      </div>
      
      <EstimatesTable status="approved" />
    </div>
  )
} 
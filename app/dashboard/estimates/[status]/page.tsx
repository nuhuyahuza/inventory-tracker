import { Metadata } from "next"
import { EstimatesTable } from "@/components/estimates/EstimatesTable"
import { capitalizeFirstLetter } from "@/lib/utils"

interface EstimateStatusPageProps {
  params: {
    status: "pending" | "approved" | "rejected"
  }
}

export function generateMetadata({ params }: EstimateStatusPageProps): Metadata {
  return {
    title: `${capitalizeFirstLetter(params.status)} Estimates | Dashboard`,
    description: `View all ${params.status} estimates`,
  }
}

export default function EstimateStatusPage({ params }: EstimateStatusPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {capitalizeFirstLetter(params.status)} Estimates
        </h2>
        <p className="text-muted-foreground">
          View and manage {params.status} estimates
        </p>
      </div>
      
      <EstimatesTable status={params.status} />
    </div>
  )
} 
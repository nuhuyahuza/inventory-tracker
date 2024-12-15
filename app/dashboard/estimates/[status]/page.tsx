import { notFound } from "next/navigation"
import { EstimatesTable } from "@/components/estimates/EstimatesTable"
import { capitalizeFirstLetter } from "@/lib/utils"

const validStatuses = ["pending", "approved", "rejected"] as const
type EstimateStatus = typeof validStatuses[number]

interface EstimateStatusPageProps {
  params: {
    status: string
  }
}

export async function generateMetadata({ params }: EstimateStatusPageProps) {
  if (!validStatuses.includes(params.status as EstimateStatus)) {
    notFound()
  }

  return {
    title: `${capitalizeFirstLetter(params.status)} Estimates | Dashboard`,
    description: `View all ${params.status} estimates`,
  }
}

export default function EstimateStatusPage({ params }: EstimateStatusPageProps) {
  if (!validStatuses.includes(params.status as EstimateStatus)) {
    notFound()
  }

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
      
      <EstimatesTable status={params.status as EstimateStatus} />
    </div>
  )
}

import { notFound } from "next/navigation"
import { SalesTable } from "@/components/sales/SalesTable"
import { CreateSaleModal } from "@/components/sales/CreateSaleModal"
import { Metadata } from "next"

// Define valid statuses
const validStatuses = [
  "pending",
  "completed",
  "refunded",
  "partially_refunded"
] as const

type SaleStatus = (typeof validStatuses)[number]

interface SaleStatusPageProps {
  params: { status: string }
}

function formatStatus(status: string) {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function SaleStatusPage({ params }: SaleStatusPageProps) {
  // Get the status from params
  const currentStatus = params.status

  // Check if the status is valid
  if (!validStatuses.includes(currentStatus as SaleStatus)) {
    return notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {formatStatus(currentStatus)} Sales
          </h2>
          <p className="text-muted-foreground">
            View and manage {formatStatus(currentStatus).toLowerCase()} sales
          </p>
        </div>
        <CreateSaleModal />
      </div>
      
      <SalesTable status={currentStatus as SaleStatus} />
    </div>
  )
}

export async function generateMetadata({ params }: SaleStatusPageProps): Promise<Metadata> {
  const currentStatus = params.status

  if (!validStatuses.includes(currentStatus as SaleStatus)) {
    return notFound()
  }

  return {
    title: `${formatStatus(currentStatus)} Sales | Dashboard`,
    description: `View and manage ${currentStatus} sales`,
  }
}

// Pre-render these routes at build time
export async function generateStaticParams() {
  return validStatuses.map((status) => ({
    status: status,
  }))
} 
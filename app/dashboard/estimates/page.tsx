import { Metadata } from "next"
import { EstimatesTable } from "@/components/estimates/EstimatesTable"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Estimates | Dashboard",
  description: "Manage your estimates and quotes",
}

export default function EstimatesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Estimates</h2>
          <p className="text-muted-foreground">
            Create and manage customer estimates
          </p>
        </div>
        <Link href="/dashboard/estimates/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Estimate
          </Button>
        </Link>
      </div>
      
      <EstimatesTable />
    </div>
  )
} 
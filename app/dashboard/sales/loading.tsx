import { Skeleton } from "@/components/ui/skeleton"
import { TableLoading } from "@/components/ui/table-loading"

export default function SalesLoading() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </div>
      
      <div className="flex gap-4">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <TableLoading columnCount={6} />
    </div>
  )
} 
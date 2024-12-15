import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface TableLoadingProps {
  columnCount: number
  rowCount?: number
}

export function TableLoading({ columnCount, rowCount = 5 }: TableLoadingProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size={30} className="text-muted-foreground" />
      </div>
    </div>
  )
} 
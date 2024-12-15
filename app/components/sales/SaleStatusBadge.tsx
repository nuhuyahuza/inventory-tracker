import { Badge } from "@/components/ui/badge"

type SaleStatus = "completed" | "refunded" | "partially_refunded" | "pending"

interface SaleStatusBadgeProps {
  status: SaleStatus
}

export function SaleStatusBadge({ status }: SaleStatusBadgeProps) {
  const statusStyles = {
    completed: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    refunded: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    partially_refunded: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    pending: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
  }

  return (
    <Badge 
      variant="secondary" 
      className={statusStyles[status]}
    >
      {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </Badge>
  )
} 
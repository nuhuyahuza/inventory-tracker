import { Badge } from "@/components/ui/badge"

interface SaleStatusBadgeProps {
  status: 'completed' | 'refunded' | 'partially_refunded'
}

export function SaleStatusBadge({ status }: SaleStatusBadgeProps) {
  const variants = {
    completed: "bg-green-100 text-green-800",
    refunded: "bg-red-100 text-red-800",
    partially_refunded: "bg-yellow-100 text-yellow-800"
  }

  return (
    <Badge className={variants[status]}>
      {status.replace('_', ' ')}
    </Badge>
  )
} 
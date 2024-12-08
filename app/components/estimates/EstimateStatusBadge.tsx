import { Badge } from "@/components/ui/badge"

type EstimateStatus = 'pending' | 'accepted' | 'rejected' | 'expired' | 'converted'

interface EstimateStatusBadgeProps {
  status: EstimateStatus
}

export function EstimateStatusBadge({ status }: EstimateStatusBadgeProps) {
  const variants = {
    pending: "warning",
    accepted: "success",
    rejected: "destructive",
    expired: "secondary",
    converted: "default"
  } as const

  return (
    <Badge variant={variants[status]}>{status}</Badge>
  )
} 
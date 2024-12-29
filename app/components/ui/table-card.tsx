import { Card } from "./card"
import { cn } from "@/lib/utils"

interface TableCardProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function TableCard({ title, description, children }: TableCardProps) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6 flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  )
} 
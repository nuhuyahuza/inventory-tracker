import { Card } from "./card"
import { cn } from "@/lib/utils"

interface TableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Record<string, any>[]
  renderItem: (item: Record<string, any>) => React.ReactNode
}

export function TableCard({ 
  items, 
  renderItem,
  className,
  ...props 
}: TableCardProps) {
  return (
    <div 
      className={cn(
        "grid gap-4 md:hidden", 
        className
      )} 
      {...props}
    >
      {items.map((item, index) => (
        <Card key={index} className="p-4">
          {renderItem(item)}
        </Card>
      ))}
    </div>
  )
} 
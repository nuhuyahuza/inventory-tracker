"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  title: string
  render?: (value: any) => React.ReactNode
}

interface ResponsiveTableProps {
  data: any[]
  columns: Column[]
  actions?: (item: any) => React.ReactNode
  className?: string
}

export function ResponsiveTable({ 
  data, 
  columns, 
  actions,
  className 
}: ResponsiveTableProps) {
  return (
    <div>
      {/* Mobile Card View */}
      <div className={cn("grid gap-4 md:hidden", className)}>
        {data.map((item, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              {columns.map((column) => (
                <div key={column.key} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {column.title}
                  </span>
                  <span className="font-medium">
                    {column.render 
                      ? column.render(item[column.key])
                      : item[column.key]
                    }
                  </span>
                </div>
              ))}
              {actions && (
                <div className="flex justify-end gap-2 mt-4">
                  {actions(item)}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th key={column.key} className="h-10 px-2 text-left align-middle font-medium">
                  {column.title}
                </th>
              ))}
              {actions && <th className="h-10 px-2 text-right"></th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b">
                {columns.map((column) => (
                  <td key={column.key} className="p-2">
                    {column.render 
                      ? column.render(item[column.key])
                      : item[column.key]
                    }
                  </td>
                ))}
                {actions && (
                  <td className="p-2 text-right">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
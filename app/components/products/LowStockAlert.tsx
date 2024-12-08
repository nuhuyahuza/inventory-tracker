"use client"

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowUpCircle } from "lucide-react"
import { inventoryItems } from "@/lib/data"

export function LowStockAlert() {
  // Filter items with quantity below minimum stock level
  const lowStockItems = inventoryItems.filter(
    item => item.quantity <= item.minStockLevel
  )

  const getStockStatus = (quantity: number, minLevel: number) => {
    if (quantity === 0) return { label: "Out of Stock", variant: "destructive" as const }
    if (quantity <= minLevel / 2) return { label: "Critical", variant: "destructive" as const }
    return { label: "Low Stock", variant: "warning" as const }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        <div>
          <h2 className="text-lg font-medium">Low Stock Alerts</h2>
          <p className="text-sm text-muted-foreground">
            {lowStockItems.length} items need attention
          </p>
        </div>
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min Stock Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockItems.map((item) => {
                const status = getStockStatus(item.quantity, item.minStockLevel)
                
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.minStockLevel}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <ArrowUpCircle className="h-4 w-4 mr-2" />
                        Restock
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
} 
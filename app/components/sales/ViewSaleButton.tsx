"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { salesData } from "@/lib/data/sales"
import { inventoryItems } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { SaleStatusBadge } from "./SaleStatusBadge"

interface ViewSaleButtonProps {
  saleId: string
}

const products = inventoryItems.reduce((acc, item) => ({
  ...acc,
  [item.id]: {
    name: item.name,
    price: item.price
  }
}), {} as Record<string, { name: string; price: number }>)

export function ViewSaleButton({ saleId }: ViewSaleButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const sale = salesData.find(s => s.id === saleId)

  if (!sale) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        View
      </Button>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Sale Details - {sale.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Sale Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Customer</p>
              <p className="font-medium">{sale.customerName || "Walk-in Customer"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{sale.date.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <SaleStatusBadge status={sale.status} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-medium">{formatCurrency(sale.total)}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="border rounded-md">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2">Item</th>
                  <th className="text-right p-2">Quantity</th>
                  <th className="text-right p-2">Price</th>
                  <th className="text-right p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {sale.items.map((item, index) => {
                  const product = products[item.productId]
                  return (
                    <tr key={index} className="border-t">
                      <td className="p-2">{product.name}</td>
                      <td className="text-right p-2">{item.quantity}</td>
                      <td className="text-right p-2">{formatCurrency(product.price)}</td>
                      <td className="text-right p-2">{formatCurrency(product.price * item.quantity)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
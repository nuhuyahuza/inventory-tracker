import { Metadata } from "next"
import { LowStockAlert } from "@/components/products/LowStockAlert"

export const metadata: Metadata = {
  title: "Low Stock | Products",
  description: "Monitor and manage low stock items",
}

export default function LowStockPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Low Stock Items</h2>
        <p className="text-muted-foreground">
          Monitor and manage products that need restocking
        </p>
      </div>
      
      <LowStockAlert />
    </div>
  )
} 
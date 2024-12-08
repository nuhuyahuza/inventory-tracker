"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { salesData } from "@/lib/data/sales"
import { inventoryItems } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { Bar } from "react-chartjs-2"

export function TopProducts() {
  // Calculate sales by product
  const productSales = salesData.reduce((acc, sale) => {
    sale.items.forEach(item => {
      if (!acc[item.productId]) {
        acc[item.productId] = {
          quantity: 0,
          revenue: 0
        }
      }
      acc[item.productId].quantity += item.quantity
      acc[item.productId].revenue += item.quantity * item.priceAtSale
    })
    return acc
  }, {} as Record<string, { quantity: number; revenue: number }>)

  // Sort products by revenue
  const topProducts = Object.entries(productSales)
    .map(([productId, data]) => ({
      product: inventoryItems.find(p => p.id === productId)?.name || 'Unknown Product',
      ...data
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  const chartData = {
    labels: topProducts.map(p => p.product),
    datasets: [
      {
        label: 'Revenue',
        data: topProducts.map(p => p.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }
    ]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products by Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={chartData} />
        <div className="mt-4 space-y-2">
          {topProducts.map((product, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{product.product}</span>
              <span className="font-medium">{formatCurrency(product.revenue)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 
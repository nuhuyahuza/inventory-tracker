"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { salesData } from "@/lib/data/sales"
import { formatCurrency } from "@/lib/utils"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function SalesOverview() {
  // Calculate total sales
  const totalSales = salesData.reduce((sum, sale) => sum + sale.total, 0)
  
  // Calculate total refunds
  const totalRefunds = salesData
    .filter(sale => sale.status === 'refunded')
    .reduce((sum, sale) => sum + sale.total, 0)
  
  // Calculate average sale value
  const averageSale = totalSales / salesData.length

  // Get sales by date for chart
  const salesByDate = salesData.reduce((acc, sale) => {
    const date = sale.date.toLocaleDateString()
    acc[date] = (acc[date] || 0) + sale.total
    return acc
  }, {} as Record<string, number>)

  const chartData = {
    labels: Object.keys(salesByDate),
    datasets: [
      {
        label: 'Daily Sales',
        data: Object.values(salesByDate),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalSales)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalRefunds)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(averageSale)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
} 
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { salesData } from "@/lib/data/sales"
import { formatCurrency } from "@/lib/utils"
import { Line } from "react-chartjs-2"

export function SalesPerformance() {
  // Get sales data for the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const dailySales = salesData
    .filter(sale => sale.date >= thirtyDaysAgo)
    .reduce((acc, sale) => {
      const date = sale.date.toLocaleDateString()
      if (!acc[date]) {
        acc[date] = {
          total: 0,
          count: 0
        }
      }
      acc[date].total += sale.total
      acc[date].count += 1
      return acc
    }, {} as Record<string, { total: number; count: number }>)

  const chartData = {
    labels: Object.keys(dailySales),
    datasets: [
      {
        label: 'Daily Revenue',
        data: Object.values(dailySales).map(d => d.total),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false
      },
      {
        label: 'Number of Sales',
        data: Object.values(dailySales).map(d => d.count),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        fill: false,
        yAxisID: 'count'
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Revenue'
        }
      },
      count: {
        beginAtZero: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Number of Sales'
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Performance (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  )
} 
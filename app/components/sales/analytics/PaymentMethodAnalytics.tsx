"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { salesData } from "@/lib/data/sales"
import { formatCurrency } from "@/lib/utils"
import { Doughnut } from "react-chartjs-2"

export function PaymentMethodAnalytics() {
  const paymentMethodTotals = salesData.reduce((acc, sale) => {
    if (!acc[sale.paymentMethod]) {
      acc[sale.paymentMethod] = {
        count: 0,
        total: 0
      }
    }
    acc[sale.paymentMethod].count += 1
    acc[sale.paymentMethod].total += sale.total
    return acc
  }, {} as Record<string, { count: number; total: number }>)

  const chartData = {
    labels: Object.keys(paymentMethodTotals).map(method => 
      method.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    ),
    datasets: [
      {
        data: Object.values(paymentMethodTotals).map(d => d.total),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex justify-center">
          <Doughnut 
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }}
          />
        </div>
        <div className="mt-4 space-y-2">
          {Object.entries(paymentMethodTotals).map(([method, data]) => (
            <div key={method} className="flex justify-between items-center">
              <span className="capitalize">
                {method.split('_').join(' ')}
              </span>
              <div className="text-right">
                <div className="font-medium">
                  {formatCurrency(data.total)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {data.count} transactions
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 
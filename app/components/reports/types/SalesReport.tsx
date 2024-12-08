"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { salesData } from "@/lib/data/sales"
import { formatCurrency } from "@/lib/utils"

export function SalesReport() {
  const [timeframe, setTimeframe] = useState("monthly")

  // Process sales data for charts
  const processedData = salesData.reduce((acc, sale) => {
    const date = new Date(sale.date)
    const key = timeframe === "monthly" 
      ? `${date.getFullYear()}-${date.getMonth() + 1}`
      : date.toISOString().split('T')[0]

    if (!acc[key]) {
      acc[key] = {
        date: key,
        totalSales: 0,
        orderCount: 0,
        averageOrderValue: 0
      }
    }

    acc[key].totalSales += sale.total
    acc[key].orderCount += 1
    acc[key].averageOrderValue = acc[key].totalSales / acc[key].orderCount

    return acc
  }, {} as Record<string, any>)

  const chartData = Object.values(processedData)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Total Sales</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(
              chartData.reduce((sum, item) => sum + item.totalSales, 0)
            )}
          </p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Total Orders</h3>
          <p className="text-2xl font-bold">
            {chartData.reduce((sum, item) => sum + item.orderCount, 0)}
          </p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Average Order Value</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(
              chartData.reduce((sum, item) => sum + item.averageOrderValue, 0) / 
              chartData.length
            )}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-medium mb-4">Sales Trend</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="totalSales" 
                stroke="#8884d8" 
                name="Total Sales"
              />
              <Line 
                type="monotone" 
                dataKey="averageOrderValue" 
                stroke="#82ca9d" 
                name="Average Order Value"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-medium mb-4">Order Distribution</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="orderCount" 
                fill="#8884d8" 
                name="Number of Orders"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
} 
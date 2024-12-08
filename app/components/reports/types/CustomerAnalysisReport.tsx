"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@/components/ui/card"
import { salesData } from "@/lib/data/sales"
import { formatCurrency } from "@/lib/utils"

export function CustomerAnalysisReport() {
  // Process customer data
  const customerData = salesData.reduce((acc, sale) => {
    if (!acc[sale.customerName]) {
      acc[sale.customerName] = {
        name: sale.customerName,
        totalSpent: 0,
        orders: 0,
        averageOrderValue: 0,
        lastPurchase: new Date(0)
      }
    }
    
    acc[sale.customerName].totalSpent += sale.total
    acc[sale.customerName].orders += 1
    acc[sale.customerName].averageOrderValue = 
      acc[sale.customerName].totalSpent / acc[sale.customerName].orders
    
    const saleDate = new Date(sale.date)
    if (saleDate > acc[sale.customerName].lastPurchase) {
      acc[sale.customerName].lastPurchase = saleDate
    }
    
    return acc
  }, {} as Record<string, any>)

  const topCustomers = Object.values(customerData)
    .sort((a: any, b: any) => b.totalSpent - a.totalSpent)
    .slice(0, 10)

  const customerSegments = {
    new: 0,
    regular: 0,
    loyal: 0,
    inactive: 0
  }

  Object.values(customerData).forEach((customer: any) => {
    const daysSinceLastPurchase = 
      (new Date().getTime() - customer.lastPurchase.getTime()) / 
      (1000 * 60 * 60 * 24)

    if (customer.orders === 1) customerSegments.new++
    else if (daysSinceLastPurchase > 90) customerSegments.inactive++
    else if (customer.orders > 5) customerSegments.loyal++
    else customerSegments.regular++
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Total Customers</h3>
          <p className="text-2xl font-bold">
            {Object.keys(customerData).length}
          </p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Average Customer Value</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(
              Object.values(customerData).reduce(
                (sum: number, customer: any) => sum + customer.totalSpent, 
                0
              ) / Object.keys(customerData).length
            )}
          </p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Loyal Customers</h3>
          <p className="text-2xl font-bold">
            {customerSegments.loyal}
          </p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">New Customers</h3>
          <p className="text-2xl font-bold">
            {customerSegments.new}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-medium mb-4">Top 10 Customers by Revenue</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topCustomers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Bar 
                dataKey="totalSpent" 
                fill="#8884d8" 
                name="Total Spent" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Customer Segments</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(customerSegments).map(([key, value]) => ({
                segment: key,
                customers: value
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="segment" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="customers" 
                  fill="#82ca9d" 
                  name="Number of Customers" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium mb-4">Average Order Values</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={topCustomers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="averageOrderValue" 
                  stroke="#8884d8" 
                  name="Average Order Value"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
} 
"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@/components/ui/card"
import { estimates } from "@/lib/data/estimates"
import { formatCurrency } from "@/lib/utils"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export function EstimatesReport() {
  const [period, setPeriod] = useState("monthly")

  // Process estimates data
  const statusData = estimates.reduce((acc, estimate) => {
    if (!acc[estimate.status]) {
      acc[estimate.status] = {
        name: estimate.status,
        value: 0,
        total: 0
      }
    }
    acc[estimate.status].value += 1
    acc[estimate.status].total += estimate.total
    return acc
  }, {} as Record<string, any>)

  const timelineData = estimates.reduce((acc, estimate) => {
    const date = new Date(estimate.createdAt)
    const key = period === "monthly" 
      ? `${date.getFullYear()}-${date.getMonth() + 1}`
      : date.toISOString().split('T')[0]

    if (!acc[key]) {
      acc[key] = {
        date: key,
        count: 0,
        accepted: 0,
        rejected: 0,
        total: 0
      }
    }

    acc[key].count += 1
    acc[key].total += estimate.total
    if (estimate.status === 'accepted') acc[key].accepted += 1
    if (estimate.status === 'rejected') acc[key].rejected += 1

    return acc
  }, {} as Record<string, any>)

  const conversionRate = (
    (statusData.accepted?.value || 0) / 
    Object.values(statusData).reduce((sum: number, item: any) => sum + item.value, 0)
  ) * 100

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Total Estimates</h3>
          <p className="text-2xl font-bold">
            {estimates.length}
          </p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Total Value</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(
              estimates.reduce((sum, est) => sum + est.total, 0)
            )}
          </p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Conversion Rate</h3>
          <p className="text-2xl font-bold">
            {conversionRate.toFixed(1)}%
          </p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Average Value</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(
              estimates.reduce((sum, est) => sum + est.total, 0) / 
              estimates.length
            )}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Estimate Status Distribution</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={Object.values(statusData)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {Object.values(statusData).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium mb-4">Estimate Timeline</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Object.values(timelineData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8884d8" 
                  name="Total Estimates"
                />
                <Line 
                  type="monotone" 
                  dataKey="accepted" 
                  stroke="#82ca9d" 
                  name="Accepted"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
} 
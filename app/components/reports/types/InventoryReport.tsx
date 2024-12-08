"use client"

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@/components/ui/card"
import { inventoryItems } from "@/lib/data"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export function InventoryReport() {
  // Process inventory data
  const categoryData = inventoryItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = {
        name: item.category,
        value: 0,
        items: 0,
        lowStock: 0
      }
    }
    
    acc[item.category].value += item.quantity
    acc[item.category].items += 1
    if (item.quantity <= item.minStockLevel) {
      acc[item.category].lowStock += 1
    }
    
    return acc
  }, {} as Record<string, any>)

  const lowStockItems = inventoryItems.filter(
    item => item.quantity <= item.minStockLevel
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Total Items</h3>
          <p className="text-2xl font-bold">{inventoryItems.length}</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Low Stock Items</h3>
          <p className="text-2xl font-bold">{lowStockItems.length}</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-medium mb-2">Categories</h3>
          <p className="text-2xl font-bold">
            {Object.keys(categoryData).length}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Stock Distribution by Category</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={Object.values(categoryData)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {Object.values(categoryData).map((entry, index) => (
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
          <h3 className="font-medium mb-4">Low Stock Items by Category</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.values(categoryData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="lowStock" 
                  fill="#ff8042" 
                  name="Low Stock Items" 
                />
                <Bar 
                  dataKey="items" 
                  fill="#8884d8" 
                  name="Total Items" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-medium mb-4">Low Stock Items</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Stock Level
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lowStockItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.minStockLevel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
} 
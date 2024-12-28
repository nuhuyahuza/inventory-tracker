"use client"

import { useState } from "react"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { inventoryItems, categories } from "@/lib/data"

export function ProductsTable() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase())
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    
    const matchesStock = stockFilter === "all" ||
      (stockFilter === "low" && item.quantity < item.minStockLevel) ||
      (stockFilter === "out" && item.quantity === 0)

    return matchesSearch && matchesCategory && matchesStock
  })

  const columns = [
    {
      key: "name",
      title: "Name",
      render: (value: string) => value
    },
    {
      key: "category",
      title: "Category",
      render: (value: string) => value
    },
    {
      key: "quantity",
      title: "Quantity",
      render: (value: number) => value.toString()
    },
    {
      key: "minStockLevel",
      title: "Min Stock Level",
      render: (value: number) => value.toString()
    },
    {
      key: "lastUpdated",
      title: "Last Updated",
      render: (value: Date) => value.toLocaleDateString()
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Stock Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Levels</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="out">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveTable
        data={filteredItems}
        columns={columns}
      />
    </div>
  )
}
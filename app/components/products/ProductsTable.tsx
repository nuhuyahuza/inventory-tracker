"use client"

import { useState, useEffect } from "react"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { formatCurrency } from "@/lib/utils"
import { TableLoading } from "@/components/ui/table-loading"
import { Input } from "@/components/ui/input"
import { InventoryService } from "@/services"
import type { InventoryItem } from "@/types/database"
import { AddProductDialog } from "./AddProductDialog"

export function ProductsTable() {
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<InventoryItem[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        const data = await InventoryService.getAll()
        setProducts(data)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadProducts()
  }, [])

  useEffect(() => {
    const handleOpenAddProduct = () => setIsAddProductOpen(true)
    window.addEventListener('openAddProduct', handleOpenAddProduct)
    return () => window.removeEventListener('openAddProduct', handleOpenAddProduct)
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <TableLoading columnCount={6} />
  }

  const columns = [
    {
      key: "sku",
      title: "SKU",
      render: (value: string) => <span className="font-medium">{value}</span>
    },
    {
      key: "name",
      title: "Name"
    },
    {
      key: "category",
      title: "Category",
      render: (value: { name: string }) => value.name
    },
    {
      key: "quantity",
      title: "Stock"
    },
    {
      key: "price",
      title: "Price",
      render: (value: number) => formatCurrency(value)
    },
    {
      key: "minStockLevel",
      title: "Min Stock Level"
    }
  ]

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px]"
        />
      </div>

      <ResponsiveTable
        data={filteredProducts}
        columns={columns}
      />

      <AddProductDialog 
        open={isAddProductOpen} 
        onOpenChange={setIsAddProductOpen}
      />
    </div>
  )
}
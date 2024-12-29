"use client"

import { useState, useEffect } from "react"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { TableLoading } from "@/components/ui/table-loading"
import { Input } from "@/components/ui/input"
import { CategoryService } from "@/services"
import type { Category } from "@/types/database"

export function CategoriesTable() {
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true)
        const data = await CategoryService.getAll()
        setCategories(data)
      } catch (error) {
        console.error('Failed to load categories:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadCategories()
  }, [])

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <TableLoading columnCount={3} />
  }

  const columns = [
    {
      key: "id",
      title: "ID",
      render: (value: string) => <span className="font-medium">{value}</span>
    },
    {
      key: "name",
      title: "Name"
    },
    {
      key: "productCount",
      title: "Products",
      render: (value: any) => {
        const category = categories.find(c => c.id === value)
        return category ? categories.filter(c => c.id === category.id).length : 0
      }
    }
  ]

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px]"
        />
      </div>

      <ResponsiveTable
        data={filteredCategories}
        columns={columns}
      />
    </div>
  )
}
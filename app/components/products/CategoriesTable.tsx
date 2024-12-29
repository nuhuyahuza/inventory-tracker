"use client"

import { useState, useEffect } from "react"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { TableLoading } from "@/components/ui/table-loading"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { CategoryService } from "@/services"
import type { Category } from "@/types/database"

export function CategoriesTable() {
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])

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

  useEffect(() => {
    loadCategories()
    // Listen for refresh events
    const handleRefresh = () => loadCategories()
    window.addEventListener('refreshCategories', handleRefresh)
    return () => window.removeEventListener('refreshCategories', handleRefresh)
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await CategoryService.delete(id)
        loadCategories()
      } catch (error) {
        console.error('Failed to delete category:', error)
      }
    }
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <TableLoading columnCount={3} />
  }

  const columns = [
    {
      key: "name",
      title: "Name"
    },
    {
      key: "actions",
      title: "Actions",
      render: (value: any, category: Category) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(category.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
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
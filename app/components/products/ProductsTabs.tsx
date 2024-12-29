"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductsTable } from "./ProductsTable"
import { CategoriesTable } from "./CategoriesTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CategoryService } from "@/services"

export function ProductsTabs() {
  const [activeTab, setActiveTab] = useState("products")
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("")

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await CategoryService.create({ name: categoryName })
      setCategoryName("")
      setIsCategoryDialogOpen(false)
      window.dispatchEvent(new CustomEvent('refreshCategories'))
    } catch (error) {
      console.error('Failed to create category:', error)
    }
  }

  return (
    <Tabs defaultValue="products" className="w-full space-y-4" onValueChange={setActiveTab}>
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        {activeTab === "products" ? (
          <Button onClick={() => window.dispatchEvent(new CustomEvent('openAddProduct'))}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        ) : (
          <Button onClick={() => setIsCategoryDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        )}
      </div>

      <TabsContent value="products">
        <ProductsTable />
      </TabsContent>
      
      <TabsContent value="categories">
        <CategoriesTable />
      </TabsContent>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <Input
                placeholder="Category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}
"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CategoryService, InventoryService } from "@/services"
import type { Category } from "@/types/database"

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface ProductFormData {
  sku: string
  name: string
  category_id: string
  quantity: number
  price: number
  min_stock_level: number
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<ProductFormData>({
    sku: "",
    name: "",
    category_id: "",
    quantity: 0,
    price: 0,
    min_stock_level: 0
  })

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await CategoryService.getAll()
        setCategories(data)
      } catch (error) {
        console.error('Failed to load categories:', error)
      }
    }
    if (open) {
      loadCategories()
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const now = new Date().toISOString()
      await InventoryService.create({
        ...formData,
        category: categories.find(c => c.id === formData.category_id)!,
        last_updated: now
      })
      setFormData({
        sku: "",
        name: "",
        category_id: "",
        quantity: 0,
        price: 0,
        min_stock_level: 0
      })
      onOpenChange(false)
      // Optionally refresh the products list
      window.location.reload()
    } catch (error) {
      console.error('Failed to create product:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
            <Input
              placeholder="Product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Minimum stock level"
              value={formData.min_stock_level}
              onChange={(e) => setFormData({ ...formData, min_stock_level: Number(e.target.value) })}
            />
          </div>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
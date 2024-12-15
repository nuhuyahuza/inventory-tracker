"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Minus, Plus, Trash2 } from "lucide-react"
import { inventoryItems as products } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
}

export function CreateSaleModal() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const total = selectedProducts.reduce(
    (sum, product) => sum + (product.price * product.quantity), 
    0
  )

  const handleAddProduct = (product: typeof products[0]) => {
    const existing = selectedProducts.find(p => p.id === product.id)
    if (existing) {
      setSelectedProducts(selectedProducts.map(p => 
        p.id === product.id 
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ))
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }])
    }
  }

  const handleQuantityChange = (productId: string, change: number) => {
    setSelectedProducts(selectedProducts.map(product => {
      if (product.id === productId) {
        const newQuantity = Math.max(1, product.quantity + change)
        return { ...product, quantity: newQuantity }
      }
      return product
    }))
  }

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  const handleCreateSale = async () => {
    try {
      if (selectedProducts.length === 0) {
        toast.error("Please add at least one product")
        return
      }

      // Add API call here to create sale
      const sale = {
        customerName: customerName || "Walk-in Customer",
        items: selectedProducts,
        total,
        status: "completed",
        date: new Date()
      }

      console.log("Creating sale:", sale)
      toast.success("Sale created successfully")
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      toast.error("Failed to create sale")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Sale</DialogTitle>
          <DialogDescription>
            Add products to create a new sale
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Customer Information */}
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Walk-in Customer"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          {/* Product Search */}
          <div className="space-y-2">
            <Label>Search Products</Label>
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Product List */}
          <div className="border rounded-md">
            <div className="grid grid-cols-4 gap-4 p-4 border-b">
              {filteredProducts.map(product => (
                <Button
                  key={product.id}
                  variant="outline"
                  className="h-auto p-4 space-y-2"
                  onClick={() => handleAddProduct(product)}
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(product.price)}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Selected Products */}
          {selectedProducts.length > 0 && (
            <div className="border rounded-md">
              <div className="p-4 space-y-4">
                {selectedProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(product.price)} each
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{product.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4 flex justify-between items-center">
                <div className="font-medium">Total:</div>
                <div className="text-lg font-bold">{formatCurrency(total)}</div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSale}>
              Complete Sale
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
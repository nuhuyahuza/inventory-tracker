import { ProductsTable } from "@/components/products/ProductsTable"
import { AddProductModal } from "@/components/products/AddProductModal"

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-muted-foreground">
            Manage your inventory items
          </p>
        </div>
        <AddProductModal />
      </div>
      
      <ProductsTable />
    </div>
  )
} 
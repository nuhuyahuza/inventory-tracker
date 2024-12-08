import { Metadata } from "next"
import { ProductExport } from "@/components/products/ProductExport"

export const metadata: Metadata = {
  title: "Export Products",
  description: "Export your product inventory",
}

export default function ExportProductsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Export Products</h2>
        <p className="text-muted-foreground">
          Export your product inventory in different formats
        </p>
      </div>
      
      <ProductExport />
    </div>
  )
} 
import { ProductsTabs } from "@/components/products/ProductsTabs"
import { TableCard } from "@/components/ui/table-card"

export default function ProductsPage() {
  return (
    <TableCard
      title="Products"
      description="Manage your products and categories"
    >
      <ProductsTabs />
    </TableCard>
  )
} 
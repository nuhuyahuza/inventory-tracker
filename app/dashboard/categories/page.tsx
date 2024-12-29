import { CategoriesTable } from "@/components/categories/CategoriesTable"
import { TableCard } from "@/components/ui/table-card"

export default function CategoriesPage() {
  return (
    <TableCard
      title="Product Categories"
      description="Manage your product categories"
    >
      <CategoriesTable />
    </TableCard>
  )
} 
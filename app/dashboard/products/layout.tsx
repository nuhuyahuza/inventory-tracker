import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ProductsSidebar } from "@/components/products/ProductsSidebar"

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <div className="flex gap-8">
        <ProductsSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </DashboardLayout>
  )
} 
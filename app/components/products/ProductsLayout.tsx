"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  ArrowLeft,
  ListFilter,
  AlertTriangle,
  FileDown,
  PlusCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const productRoutes = [
  {
    title: "All Products",
    href: "/dashboard/products",
    icon: ListFilter
  },
  {
    title: "Low Stock",
    href: "/dashboard/products/low-stock",
    icon: AlertTriangle
  },
  {
    title: "Add Product",
    href: "/dashboard/products/add",
    icon: PlusCircle
  },
  {
    title: "Export Products",
    href: "/dashboard/products/export",
    icon: FileDown
  }
]

interface ProductsLayoutProps {
  children: React.ReactNode
}

export function ProductsLayout({ children }: ProductsLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-[64px] border-r bg-gray-50/40">
        <div className="flex flex-col flex-1 gap-2 p-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center gap-2 px-4 py-2">
            <Package className="h-5 w-5" />
            <h2 className="font-semibold">Products</h2>
          </div>

          <nav className="flex flex-col gap-1">
            {productRoutes.map((route) => {
              const Icon = route.icon
              return (
                <Link key={route.href} href={route.href}>
                  <span className={cn(
                    "group flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900",
                    pathname === route.href ? "bg-gray-100 text-gray-900" : "text-gray-600"
                  )}>
                    <Icon className="mr-2 h-4 w-4" />
                    {route.title}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex-1">
        <div className="px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  )
} 
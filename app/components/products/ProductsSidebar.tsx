"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Package, 
  PlusCircle, 
  AlertTriangle, 
  Download 
} from "lucide-react"

const productLinks = [
  {
    title: "All Products",
    href: "/dashboard/products",
    icon: Package
  },
  {
    title: "Add Product",
    href: "/dashboard/products/new",
    icon: PlusCircle
  },
  {
    title: "Low Stock",
    href: "/dashboard/products/low-stock",
    icon: AlertTriangle
  },
  {
    title: "Export",
    href: "/dashboard/products/export",
    icon: Download
  }
]

export function ProductsSidebar() {
  const pathname = usePathname()
  
  return (
    <nav className="w-64 space-y-2">
      {productLinks.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{link.title}</span>
          </Link>
        )
      })}
    </nav>
  )
} 
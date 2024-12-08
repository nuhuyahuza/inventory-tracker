"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  ShoppingCart, 
  PlusCircle, 
  RefreshCcw,
  Download,
  History
} from "lucide-react"

const salesLinks = [
  {
    title: "Sales History",
    href: "/dashboard/sales",
    icon: History
  },
  {
    title: "New Sale",
    href: "/dashboard/sales/new",
    icon: PlusCircle
  },
  {
    title: "Refunds",
    href: "/dashboard/sales/refunds",
    icon: RefreshCcw
  },
  {
    title: "Export",
    href: "/dashboard/sales/export",
    icon: Download
  }
]

export function SalesSidebar() {
  const pathname = usePathname()
  
  return (
    <nav className="w-64 space-y-2">
      {salesLinks.map((link) => {
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
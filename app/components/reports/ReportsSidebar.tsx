"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart2,
  Package,
  ShoppingCart,
  FileText,
  Users,
  UserCircle,
  Clock,
  Settings
} from "lucide-react"

const reportLinks = [
  {
    title: "Overview",
    href: "/dashboard/reports",
    icon: BarChart2
  },
  {
    title: "Sales Reports",
    href: "/dashboard/reports/sales",
    icon: ShoppingCart
  },
  {
    title: "Inventory Reports",
    href: "/dashboard/reports/inventory",
    icon: Package
  },
  {
    title: "Estimates Reports",
    href: "/dashboard/reports/estimates",
    icon: FileText
  },
  {
    title: "Customer Reports",
    href: "/dashboard/reports/customers",
    icon: Users
  },
  {
    title: "Employee Reports",
    href: "/dashboard/reports/employees",
    icon: UserCircle
  },
  {
    title: "Scheduled Reports",
    href: "/dashboard/reports/scheduled",
    icon: Clock
  },
  {
    title: "Report Settings",
    href: "/dashboard/reports/settings",
    icon: Settings
  }
]

export function ReportsSidebar() {
  const pathname = usePathname()
  
  return (
    <nav className="w-64 space-y-2">
      {reportLinks.map((link) => {
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
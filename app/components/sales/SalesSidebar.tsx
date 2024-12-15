"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  FileText, 
  PlusCircle, 
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Download
} from "lucide-react"

const salesLinks = [
  {
    title: "All Sales",
    href: "/dashboard/sales",
    icon: FileText
  },
  {
    title: "Pending",
    href: "/dashboard/sales/pending",
    icon: Clock
  },
  {
    title: "Completed",
    href: "/dashboard/sales/completed",
    icon: CheckCircle2
  },
  {
    title: "Refunded",
    href: "/dashboard/sales/refunded",
    icon: RefreshCcw
  },
  {
    title: "Partially Refunded",
    href: "/dashboard/sales/partially_refunded",
    icon: XCircle
  },
  {
    title: "New Sale",
    href: "/dashboard/sales/new",
    icon: PlusCircle
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
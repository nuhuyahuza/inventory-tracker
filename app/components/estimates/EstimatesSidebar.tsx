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
  ShoppingCart,
  Download
} from "lucide-react"

const estimateLinks = [
  {
    title: "All Estimates",
    href: "/dashboard/estimates",
    icon: FileText
  },
  {
    title: "Create Estimate",
    href: "/dashboard/estimates/new",
    icon: PlusCircle
  },
  {
    title: "Pending",
    href: "/dashboard/estimates/pending",
    icon: Clock
  },
  {
    title: "Accepted",
    href: "/dashboard/estimates/accepted",
    icon: CheckCircle2
  },
  {
    title: "Rejected",
    href: "/dashboard/estimates/rejected",
    icon: XCircle
  },
  {
    title: "Converted",
    href: "/dashboard/estimates/converted",
    icon: ShoppingCart
  },
  {
    title: "Export",
    href: "/dashboard/estimates/export",
    icon: Download
  }
]

export function EstimatesSidebar() {
  const pathname = usePathname()
  
  return (
    <nav className="w-64 space-y-2">
      {estimateLinks.map((link) => {
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
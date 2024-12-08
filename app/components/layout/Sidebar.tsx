"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings,
  Users
} from "lucide-react"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Estimates",
    icon: FileText,
    href: "/dashboard/estimates",
  },
  {
    label: "Reports",
    icon: BarChart3,
    href: "/dashboard/reports",
  },
  {
    label: "Team",
    icon: Users,
    href: "/dashboard/team",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[200px] flex-col border-r bg-muted/10">
      <div className="flex flex-1 flex-col gap-2 p-4">
        {routes.map((route) => {
          const Icon = route.icon
          const isActive = pathname === route.href
          
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {route.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
} 
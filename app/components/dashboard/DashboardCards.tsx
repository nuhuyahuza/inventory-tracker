"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { 
  Package, 
  ShoppingCart,
  FileText,
  Users,
  BarChart3,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

const modules = [
  {
    title: "Products",
    icon: Package,
    href: "/dashboard/products",
    description: "Manage your inventory items",
    color: "bg-blue-500"
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    href: "/dashboard/sales",
    description: "Track and manage sales",
    color: "bg-green-500"
  },
  {
    title: "Estimates",
    icon: FileText,
    href: "/dashboard/estimates",
    description: "Create and manage estimates",
    color: "bg-purple-500"
  },
  {
    title: "Reports",
    icon: BarChart3,
    href: "/dashboard/reports",
    description: "View analytics and reports",
    color: "bg-yellow-500"
  },
  {
    title: "Team",
    icon: Users,
    href: "/dashboard/team",
    description: "Manage team members",
    color: "bg-pink-500"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    description: "Configure system settings",
    color: "bg-gray-500"
  }
]

export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => {
        const Icon = module.icon
        
        return (
          <Link key={module.title} href={module.href}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={cn("p-2 rounded-lg", module.color)}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{module.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
} 
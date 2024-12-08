"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { 
  Package, 
  ShoppingCart,
  FileText,
  Users,
  BarChart3,
  Settings,
  ClipboardList,
  Building2,
  Boxes,
  UserCircle,
  Receipt,
  BadgeDollarSign,
  FileBarChart
} from "lucide-react"
import { cn } from "@/lib/utils"

const modules = [
  {
    title: "Products",
    icon: Package,
    href: "/dashboard/products",
    description: "Manage your inventory and product catalog",
    color: "bg-blue-500",
    stats: "Inventory Management"
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    href: "/dashboard/sales",
    description: "Process and track sales transactions",
    color: "bg-green-500",
    stats: "Sales Management"
  },
  {
    title: "Estimates",
    icon: FileText,
    href: "/dashboard/estimates",
    description: "Create and manage customer estimates",
    color: "bg-purple-500",
    stats: "Quote Generation"
  },
  {
    title: "Customers",
    icon: Users,
    href: "/dashboard/customers",
    description: "Manage customer relationships",
    color: "bg-pink-500",
    stats: "CRM"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    description: "View business insights and trends",
    color: "bg-yellow-500",
    stats: "Business Intelligence"
  },
  {
    title: "Orders",
    icon: ClipboardList,
    href: "/dashboard/orders",
    description: "Track and manage customer orders",
    color: "bg-orange-500",
    stats: "Order Processing"
  },
  {
    title: "Companies",
    icon: Building2,
    href: "/dashboard/companies",
    description: "Manage business entities and branches",
    color: "bg-cyan-500",
    stats: "Business Management"
  },
  {
    title: "Stock",
    icon: Boxes,
    href: "/dashboard/stock",
    description: "Monitor and manage inventory levels",
    color: "bg-emerald-500",
    stats: "Stock Control"
  },
  {
    title: "Profile",
    icon: UserCircle,
    href: "/dashboard/profile",
    description: "Manage your account settings",
    color: "bg-indigo-500",
    stats: "Account Management"
  },
  {
    title: "Invoices",
    icon: Receipt,
    href: "/dashboard/invoices",
    description: "Generate and track invoices",
    color: "bg-rose-500",
    stats: "Billing"
  },
  {
    title: "Expenses",
    icon: BadgeDollarSign,
    href: "/dashboard/expenses",
    description: "Track business expenses",
    color: "bg-amber-500",
    stats: "Cost Management"
  },
  {
    title: "Reports",
    icon: FileBarChart,
    href: "/dashboard/reports",
    description: "Generate detailed business reports",
    color: "bg-slate-500",
    stats: "Reporting"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    description: "Configure system preferences",
    color: "bg-gray-500",
    stats: "System Settings"
  }
]

export function ModuleCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {modules.map((module) => {
        const Icon = module.icon
        
        return (
          <Link key={module.title} href={module.href}>
            <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-lg", module.color)}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {module.stats}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {module.description}
                </p>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
} 
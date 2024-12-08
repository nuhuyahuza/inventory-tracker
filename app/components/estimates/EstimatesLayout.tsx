"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  ArrowLeft,
  ListFilter,
  Clock,
  PlusCircle,
  CheckCircle2,
  XCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const estimateRoutes = [
  {
    title: "All Estimates",
    href: "/dashboard/estimates",
    icon: ListFilter
  },
  {
    title: "Create Estimate",
    href: "/dashboard/estimates/create",
    icon: PlusCircle
  },
  {
    title: "Pending Approval",
    href: "/dashboard/estimates/pending",
    icon: Clock
  },
  {
    title: "Approved",
    href: "/dashboard/estimates/approved",
    icon: CheckCircle2
  },
  {
    title: "Rejected",
    href: "/dashboard/estimates/rejected",
    icon: XCircle
  }
]

interface EstimatesLayoutProps {
  children: React.ReactNode
}

export function EstimatesLayout({ children }: EstimatesLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-1">
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-[64px] border-r bg-gray-50/40">
        <div className="flex flex-col flex-1 gap-2 p-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center gap-2 px-4 py-2">
            <FileText className="h-5 w-5" />
            <h2 className="font-semibold">Estimates</h2>
          </div>

          <nav className="flex flex-col gap-1">
            {estimateRoutes.map((route) => {
              const Icon = route.icon
              const isActive = pathname === route.href
              return (
                <Link key={route.href} href={route.href}>
                  <span className={cn(
                    "group flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900",
                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-600"
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

      <div className="lg:pl-64 flex-1">
        <div className="px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  )
} 
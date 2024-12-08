"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Store,
  CreditCard,
  Users,
  Bell,
  Mail,
  Shield,
  Printer,
  Database,
  Palette,
  Settings
} from "lucide-react"

const settingsLinks = [
  {
    title: "General",
    href: "/dashboard/settings",
    icon: Settings
  },
  {
    title: "Company Profile",
    href: "/dashboard/settings/company",
    icon: Store
  },
  {
    title: "Billing & Subscription",
    href: "/dashboard/settings/billing",
    icon: CreditCard
  },
  {
    title: "Team Members",
    href: "/dashboard/settings/team",
    icon: Users
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: Bell
  },
  {
    title: "Email Templates",
    href: "/dashboard/settings/email-templates",
    icon: Mail
  },
  {
    title: "Security",
    href: "/dashboard/settings/security",
    icon: Shield
  },
  {
    title: "Printing & PDF",
    href: "/dashboard/settings/printing",
    icon: Printer
  },
  {
    title: "Data Management",
    href: "/dashboard/settings/data",
    icon: Database
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
    icon: Palette
  }
]

export function SettingsSidebar() {
  const pathname = usePathname()
  
  return (
    <nav className="w-64 space-y-2">
      {settingsLinks.map((link) => {
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
import { Metadata } from "next"
import { ModuleCards } from "@/components/modules/ModuleCards"

export const metadata: Metadata = {
  title: "Modules | Dashboard",
  description: "Access all system modules and features",
}

export default function ModulesPage() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground">
          Select a module to get started
        </p>
      </div>
      
      <ModuleCards />
    </div>
  )
} 
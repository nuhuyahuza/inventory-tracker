"use client"
import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotFoundProps {
  title?: string
  description?: string
  backPath: string
  backLabel: string
}

export function NotFound({ 
  title = "Page Not Found",
  description = "Sorry, we couldn't find the page you're looking for.",
  backPath,
  backLabel
}: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground text-center max-w-md">
          {description}
        </p>
      </div>
      
      <div className="flex gap-4">
        <Link href={backPath}>
          <Button variant="default">
            {backLabel}
          </Button>
        </Link>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  )
} 
"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { exportToCSV } from "@/lib/utils/export"
import { inventoryItems } from "@/lib/data"

export function ExportButton() {
  const handleExport = () => {
    exportToCSV(inventoryItems)
  }

  return (
    <Button onClick={handleExport} variant="outline">
      <Download className="h-4 w-4 mr-2" />
      Export to CSV
    </Button>
  )
} 
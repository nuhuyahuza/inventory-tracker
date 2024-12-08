"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Mail, Trash2, MoreHorizontal } from "lucide-react"
import { Estimate } from "@/lib/data/estimates"
import { generateEstimatePDF } from "@/lib/utils/pdf"

interface BulkActionsProps {
  selectedEstimates: Estimate[]
  onClearSelection: () => void
}

export function BulkActions({ selectedEstimates, onClearSelection }: BulkActionsProps) {
  if (selectedEstimates.length === 0) return null

  const handleBulkDownload = () => {
    selectedEstimates.forEach(estimate => {
      const doc = generateEstimatePDF(estimate)
      doc.save(`estimate-${estimate.id}.pdf`)
    })
    onClearSelection()
  }

  const handleBulkEmail = () => {
    // Implementation for bulk emailing
    console.log('Bulk email:', selectedEstimates)
    onClearSelection()
  }

  const handleBulkDelete = () => {
    // Implementation for bulk deletion
    console.log('Bulk delete:', selectedEstimates)
    onClearSelection()
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
      <span className="text-sm font-medium">
        {selectedEstimates.length} selected
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleBulkDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        Download PDFs
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleBulkEmail}
      >
        <Mail className="h-4 w-4 mr-2" />
        Email Selected
      </Button>
      
      <Button
        variant="destructive"
        size="sm"
        onClick={handleBulkDelete}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete Selected
      </Button>
    </div>
  )
} 
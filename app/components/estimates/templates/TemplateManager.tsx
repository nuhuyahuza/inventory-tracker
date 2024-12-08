"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { estimateTemplates } from "@/lib/data/estimateTemplates"
import { SaveTemplate } from "./SaveTemplate"
import { formatCurrency } from "@/lib/utils"

export function TemplateManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    // Logic to populate estimate form with template data
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Load Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Estimate Templates</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Usage Count</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estimateTemplates.map((template) => {
                const total = template.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )

                return (
                  <TableRow key={template.id}>
                    <TableCell>{template.name}</TableCell>
                    <TableCell>{template.description}</TableCell>
                    <TableCell>{template.items.length} items</TableCell>
                    <TableCell>
                      {template.lastUsed?.toLocaleDateString() || 'Never'}
                    </TableCell>
                    <TableCell>{template.useCount}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUseTemplate(template.id)}
                        >
                          Use
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
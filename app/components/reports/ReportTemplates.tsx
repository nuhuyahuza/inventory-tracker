"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Copy, Edit, Trash, FileText } from "lucide-react"
import { ReportTemplate } from "@/lib/data/reports"

const sampleTemplates: ReportTemplate[] = [
  {
    id: "TPL001",
    name: "Monthly Sales Summary",
    description: "Comprehensive monthly sales analysis with product breakdown",
    type: "sales",
    filters: { period: "monthly" },
    columns: ["date", "total_sales", "products", "revenue"],
    useCount: 15
  },
  // Add more templates...
]

export function ReportTemplates() {
  const [templates, setTemplates] = useState(sampleTemplates)
  const [search, setSearch] = useState("")

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(search.toLowerCase()) ||
    template.description?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDuplicate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      const newTemplate = {
        ...template,
        id: `TPL${Math.random().toString(36).substr(2, 9)}`,
        name: `${template.name} (Copy)`,
        useCount: 0
      }
      setTemplates([...templates, newTemplate])
    }
  }

  const handleDelete = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button>Create Template</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{template.name}</span>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Type:</span>
                    <span className="capitalize">{template.type}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Used:</span>
                    <span>{template.useCount} times</span>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDuplicate(template.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 
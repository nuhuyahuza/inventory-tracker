"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileDown, Eye, EyeOff } from "lucide-react"
import { estimates } from "@/lib/data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function EstimateExport() {
  const [format, setFormat] = useState<"csv" | "excel">("csv")
  const [selectedFields, setSelectedFields] = useState([
    "id",
    "customerName",
    "total",
    "status"
  ])
  const [showPreview, setShowPreview] = useState(false)

  const previewData = estimates.slice(0, 5).map(estimate => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowData: Record<string, any> = {}
    selectedFields.forEach(field => {
      rowData[field] = estimate[field as keyof typeof estimate]
    })
    return rowData
  })

  const handleExport = () => {
    const headers = selectedFields.join(',') + '\n'
    const data = estimates.map(estimate => {
      return selectedFields.map(field => estimate[field as keyof typeof estimate]).join(',')
    }).join('\n')

    const csvContent = headers + data
    const blob = new Blob([csvContent], { 
      type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/vnd.ms-excel' 
    })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `estimates-export.${format}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Export Format</h3>
          <Select value={format} onValueChange={(value: "csv" | "excel") => setFormat(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Fields to Export</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "id", label: "Estimate ID" },
              { id: "customerName", label: "Customer Name" },
              { id: "customerEmail", label: "Customer Email" },
              { id: "total", label: "Total" },
              { id: "status", label: "Status" },
              { id: "createdAt", label: "Created Date" },
              { id: "validUntil", label: "Valid Until" },
            ].map((field) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Checkbox
                  id={field.id}
                  checked={selectedFields.includes(field.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFields([...selectedFields, field.id])
                    } else {
                      setSelectedFields(selectedFields.filter(f => f !== field.id))
                    }
                  }}
                />
                <label htmlFor={field.id} className="text-sm">{field.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
            className="w-full"
          >
            {showPreview ? (
              <><EyeOff className="mr-2 h-4 w-4" /> Hide Preview</>
            ) : (
              <><Eye className="mr-2 h-4 w-4" /> Show Preview</>
            )}
          </Button>

          {showPreview && (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {selectedFields.map(field => (
                      <TableHead key={field}>{field}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((item, index) => (
                    <TableRow key={index}>
                      {selectedFields.map(field => (
                        <TableCell key={field}>
                          {String(item[field] || '')}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <Button onClick={handleExport} className="w-full">
          <FileDown className="mr-2 h-4 w-4" />
          Export Estimates ({format.toUpperCase()})
        </Button>
      </div>
    </Card>
  )
} 
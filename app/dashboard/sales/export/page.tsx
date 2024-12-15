"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { salesData } from "@/lib/data/sales"
import { Download } from "lucide-react"
import { toast } from "react-hot-toast"

export default function ExportSalesPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const handleExport = () => {
    try {
      // Filter sales by date range
      const filteredSales = salesData.filter(sale => {
        if (!dateRange.from || !dateRange.to) return true
        const saleDate = new Date(sale.date)
        return saleDate >= dateRange.from && saleDate <= dateRange.to
      })

      // Create CSV content
      const csvContent = [
        ["Sale ID", "Date", "Customer", "Items", "Total", "Status"].join(","),
        ...filteredSales.map(sale => [
          sale.id,
          sale.date.toLocaleDateString(),
          sale.customerName || "Walk-in Customer",
          sale.items.length,
          sale.total,
          sale.status
        ].join(","))
      ].join("\n")

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "sales-export.csv"
      a.click()
      window.URL.revokeObjectURL(url)
      
      toast.success("Sales data exported successfully")
    } catch (error) {
      toast.error("Failed to export sales data")
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Export Sales</h2>
        <p className="text-muted-foreground">
          Export your sales data to CSV
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Date Range</CardTitle>
            <CardDescription>
              Select a date range for the export
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range: any) => setDateRange(range)}
              numberOfMonths={2}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>
              Configure and download your export
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The export will include all sales data within the selected date range.
              If no date range is selected, all sales will be exported.
            </p>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export to CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
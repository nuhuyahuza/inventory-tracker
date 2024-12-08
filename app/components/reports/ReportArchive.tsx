"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, Trash, RotateCcw } from "lucide-react"

interface ArchivedReport {
  id: string
  name: string
  type: string
  archivedAt: Date
  archivedBy: string
  size: string
  format: string
}

const sampleArchivedReports: ArchivedReport[] = [
  {
    id: "ARC001",
    name: "Q1 2023 Sales Report",
    type: "sales",
    archivedAt: new Date("2023-04-01"),
    archivedBy: "John Doe",
    size: "2.4 MB",
    format: "pdf"
  },
  // Add more archived reports...
]

export function ReportArchive() {
  const [reports, setReports] = useState(sampleArchivedReports)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.name.toLowerCase().includes(search.toLowerCase()) ||
      report.id.toLowerCase().includes(search.toLowerCase())
    
    const matchesType = typeFilter === "all" || report.type === typeFilter

    return matchesSearch && matchesType
  })

  const handleRestore = (reportId: string) => {
    // Implementation for restoring report
    console.log('Restore report:', reportId)
  }

  const handleDelete = (reportId: string) => {
    setReports(reports.filter(report => report.id !== reportId))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search archived reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="inventory">Inventory</SelectItem>
            <SelectItem value="estimates">Estimates</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Archived Date</TableHead>
              <TableHead>Archived By</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell className="capitalize">{report.type}</TableCell>
                <TableCell>{report.archivedAt.toLocaleDateString()}</TableCell>
                <TableCell>{report.archivedBy}</TableCell>
                <TableCell>{report.size}</TableCell>
                <TableCell className="uppercase">{report.format}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRestore(report.id)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(report.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, MoreVertical, Archive, Trash } from "lucide-react"

interface Report {
  id: string
  name: string
  type: string
  createdAt: Date
  createdBy: string
  format: string
  status: 'completed' | 'failed' | 'processing'
}

const sampleReports: Report[] = [
  {
    id: "RPT001",
    name: "Monthly Sales Report",
    type: "sales",
    createdAt: new Date(),
    createdBy: "John Doe",
    format: "pdf",
    status: "completed"
  },
  // Add more sample reports...
]

export function ReportList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reports, setReports] = useState<Report[]>(sampleReports)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.name.toLowerCase().includes(search.toLowerCase()) ||
      report.id.toLowerCase().includes(search.toLowerCase())
    
    const matchesType = typeFilter === "all" || report.type === typeFilter

    return matchesSearch && matchesType
  })

  const handleArchive = (reportId: string) => {
    // Implementation for archiving report
    console.log('Archive report:', reportId)
  }

  const handleDelete = (reportId: string) => {
    // Implementation for deleting report
    console.log('Delete report:', reportId)
  }

  const handleDownload = (reportId: string) => {
    // Implementation for downloading report
    console.log('Download report:', reportId)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search reports..."
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
            <SelectItem value="customers">Customers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell className="capitalize">{report.type}</TableCell>
                <TableCell>{report.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>{report.createdBy}</TableCell>
                <TableCell className="uppercase">{report.format}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${report.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      report.status === 'failed' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {report.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload(report.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleArchive(report.id)}>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(report.id)}
                        className="text-red-600"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 
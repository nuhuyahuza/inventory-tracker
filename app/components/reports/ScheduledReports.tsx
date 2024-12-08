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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScheduledReportForm } from "./ScheduledReportForm"
import { Play, Pause, Edit, Trash } from "lucide-react"

interface ScheduledReport {
  id: string
  name: string
  type: string
  frequency: string
  lastRun?: Date
  nextRun: Date
  recipients: string[]
  status: 'active' | 'paused'
}

const sampleScheduledReports: ScheduledReport[] = [
  {
    id: "SCH001",
    name: "Daily Sales Summary",
    type: "sales",
    frequency: "daily",
    lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000),
    recipients: ["john@example.com", "jane@example.com"],
    status: "active"
  },
  // Add more sample scheduled reports...
]

export function ScheduledReports() {
  const [reports, setReports] = useState<ScheduledReport[]>(sampleScheduledReports)

  const handleToggleStatus = (reportId: string) => {
    setReports(reports.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          status: report.status === 'active' ? 'paused' : 'active'
        }
      }
      return report
    }))
  }

  const handleDelete = (reportId: string) => {
    setReports(reports.filter(report => report.id !== reportId))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Scheduled Reports</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Schedule New Report</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule New Report</DialogTitle>
            </DialogHeader>
            <ScheduledReportForm onSubmit={console.log} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell className="capitalize">{report.frequency}</TableCell>
                <TableCell>
                  {report.lastRun?.toLocaleDateString() || 'Never'}
                </TableCell>
                <TableCell>{report.nextRun.toLocaleDateString()}</TableCell>
                <TableCell>{report.recipients.join(", ")}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {report.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(report.id)}
                    >
                      {report.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
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
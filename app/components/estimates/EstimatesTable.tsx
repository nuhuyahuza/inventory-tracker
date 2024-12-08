"use client"

import { useState } from "react"
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
import { estimates } from "@/lib/data/estimates"
import { formatCurrency } from "@/lib/utils"
import { EstimateStatusBadge } from "@/components/estimates/EstimateStatusBadge"
import { ConvertToSaleButton } from "./ConvertToSaleButton"
import { ViewEstimateButton } from "./ViewEstimateButton"

export function EstimatesTable() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  const filteredEstimates = estimates.filter(estimate => {
    const matchesSearch = 
      estimate.customerName.toLowerCase().includes(search.toLowerCase()) ||
      estimate.id.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || estimate.status === statusFilter
    
    const matchesDate = dateFilter === "all" || (() => {
      const today = new Date()
      const estimateDate = new Date(estimate.createdAt)
      switch (dateFilter) {
        case "week":
          const weekAgo = new Date(today.setDate(today.getDate() - 7))
          return estimateDate >= weekAgo
        case "month":
          const monthAgo = new Date(today.setMonth(today.getMonth() - 1))
          return estimateDate >= monthAgo
        default:
          return true
      }
    })()

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search by customer or estimate ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estimate ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEstimates.map((estimate) => (
              <TableRow key={estimate.id}>
                <TableCell>{estimate.id}</TableCell>
                <TableCell>{estimate.customerName}</TableCell>
                <TableCell>{estimate.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>{estimate.validUntil.toLocaleDateString()}</TableCell>
                <TableCell>{formatCurrency(estimate.total)}</TableCell>
                <TableCell>
                  <EstimateStatusBadge status={estimate.status} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ViewEstimateButton estimate={estimate} />
                    {estimate.status === 'pending' && (
                      <ConvertToSaleButton estimate={estimate} />
                    )}
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
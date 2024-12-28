"use client"

import { useState } from "react"
import { ResponsiveTable } from "@/components/ui/responsive-table"
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

type EstimateStatus = 'pending' | 'accepted' | 'rejected' | 'expired' | 'converted'

interface EstimatesTableProps {
  status?: string
}

export function EstimatesTable({ status = "all" }: EstimatesTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>(status)
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

  const columns = [
    {
      key: "id",
      title: "Estimate ID",
      render: (value: string) => value
    },
    {
      key: "customerName", 
      title: "Customer",
      render: (value: string) => value
    },
    {
      key: "createdAt",
      title: "Created Date", 
      render: (value: Date) => value.toLocaleDateString()
    },
    {
      key: "validUntil",
      title: "Valid Until",
      render: (value: Date) => value.toLocaleDateString()
    },
    {
      key: "total",
      title: "Total",
      render: (value: number) => formatCurrency(value)
    },
    {
      key: "status",
      title: "Status",
      render: (value: string) => <EstimateStatusBadge status={value as EstimateStatus} />
    },
    {
      key: "actions",
      title: "Actions",
      render: (estimate: any) => (
        <div className="flex gap-2">
          <ViewEstimateButton estimate={estimate} />
          {estimate.status === 'pending' && (
            <ConvertToSaleButton estimate={estimate} />
          )}
        </div>
      )
    }
  ]

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

      <ResponsiveTable
        data={filteredEstimates}
        columns={columns}
        actions={(estimate) => (
          <div className="flex gap-2">
            <ViewEstimateButton estimate={estimate} />
            {estimate.status === 'pending' && (
              <ConvertToSaleButton estimate={estimate} />
            )}
          </div>
        )}
      />
    </div>
  )
}
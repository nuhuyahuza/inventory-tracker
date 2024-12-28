"use client"

import { useState, useEffect } from "react"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { formatCurrency } from "@/lib/utils"
import { SaleStatusBadge } from "./SaleStatusBadge"
import { ViewSaleButton } from "./ViewSaleButton"
import { TableLoading } from "@/components/ui/table-loading"
import { salesData } from "@/lib/data/sales"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SaleStatus = "all" | "pending" | "completed" | "refunded" | "partially_refunded"

interface Sale {
  id: string
  date: Date
  customerName?: string
  items: {
    productId: string
    quantity: number
    priceAtSale: number
  }[]
  total: number
  paymentMethod: 'cash' | 'credit_card' | 'paypal'
  status: Exclude<SaleStatus, "all">
  employeeId: string
  notes?: string
}

interface SalesTableProps {
  status?: SaleStatus
}

export function SalesTable({ status = "all" }: SalesTableProps) {
  const [search, setSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [sales, setSales] = useState<Sale[]>([])

  useEffect(() => {
    const loadSales = async () => {
      try {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Filter sales based on status
        const filteredSales = status === "all" 
          ? salesData 
          : salesData.filter(sale => sale.status === status)
        
        setSales(filteredSales)
      } finally {
        setIsLoading(false)
      }
    }
    loadSales()
  }, [status])

  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      sale.id.toLowerCase().includes(search.toLowerCase())
    
    const matchesDate = dateFilter === "all" || (() => {
      const today = new Date()
      const saleDate = new Date(sale.date)
      switch (dateFilter) {
        case "today":
          return saleDate.toDateString() === today.toDateString()
        case "week":
          const weekAgo = new Date(today.setDate(today.getDate() - 7))
          return saleDate >= weekAgo
        case "month":
          const monthAgo = new Date(today.setMonth(today.getMonth() - 1))
          return saleDate >= monthAgo
        default:
          return true
      }
    })()

    return matchesSearch && matchesDate
  })

  if (isLoading) {
    return <TableLoading columnCount={7} />
  }

  const columns = [
    {
      key: "id",
      title: "Sale ID",
      render: (value: string) => <span className="font-medium">{value}</span>
    },
    {
      key: "date",
      title: "Date",
      render: (value: Date) => value.toLocaleDateString()
    },
    {
      key: "customerName",
      title: "Customer",
      render: (value?: string) => value || "Walk-in Customer"
    },
    {
      key: "items",
      title: "Items",
      render: (value: any[]) => `${value.length} items`
    },
    {
      key: "total",
      title: "Total",
      render: (value: number) => formatCurrency(value)
    },
    {
      key: "status",
      title: "Status",
      render: (value: Exclude<SaleStatus, "all">) => <SaleStatusBadge status={value} />
    }
  ]

  const renderActions = (sale: Sale) => (
    <ViewSaleButton saleId={sale.id} />
  )

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by customer or sale ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px]"
          />
          
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveTable
        data={filteredSales}
        columns={columns}
        actions={renderActions}
      />
    </div>
  )
}
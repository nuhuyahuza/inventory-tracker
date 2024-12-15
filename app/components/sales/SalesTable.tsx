"use client"

import { useState, useEffect } from "react"
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
import { formatCurrency } from "@/lib/utils"
import { SaleStatusBadge } from "./SaleStatusBadge"
import { ViewSaleButton } from "./ViewSaleButton"
import { TableLoading } from "@/components/ui/table-loading"
import { salesData } from "@/lib/data/sales"

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

      <div className="border rounded-md w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sale ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-full">Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No sales found.
                </TableCell>
              </TableRow>
            ) : (
              filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.date.toLocaleDateString()}</TableCell>
                  <TableCell>{sale.customerName || "Walk-in Customer"}</TableCell>
                  <TableCell>{sale.items.length} items</TableCell>
                  <TableCell>{formatCurrency(sale.total)}</TableCell>
                  <TableCell>
                    <SaleStatusBadge status={sale.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <ViewSaleButton saleId={sale.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
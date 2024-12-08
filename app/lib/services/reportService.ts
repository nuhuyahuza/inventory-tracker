import { jsPDF } from "jspdf"
import "jspdf-autotable"
import * as XLSX from 'xlsx'
import { ReportType, ReportFilter } from "@/lib/data/reports"
import { salesData } from "@/lib/data/sales"
import { inventoryItems } from "@/lib/data"
import { estimates } from "@/lib/data/estimates"
import { formatCurrency, formatDate } from "@/lib/utils"

export class ReportService {
  private static getFilteredData(type: ReportType, filters: ReportFilter) {
    const startDate = filters.startDate ? new Date(filters.startDate) : null
    const endDate = filters.endDate ? new Date(filters.endDate) : null

    switch (type) {
      case 'sales':
        return salesData.filter(sale => {
          if (startDate && sale.date < startDate) return false
          if (endDate && sale.date > endDate) return false
          if (filters.status && sale.status !== filters.status) return false
          return true
        })

      case 'inventory':
        return inventoryItems.filter(item => {
          if (filters.category && item.category !== filters.category) return false
          return true
        })

      case 'estimates':
        return estimates.filter(estimate => {
          if (startDate && estimate.createdAt < startDate) return false
          if (endDate && estimate.createdAt > endDate) return false
          if (filters.status && estimate.status !== filters.status) return false
          return true
        })

      default:
        return []
    }
  }

  static generatePDF(type: ReportType, filters: ReportFilter, columns: string[]) {
    const doc = new jsPDF()
    const data = this.getFilteredData(type, filters)
    
    // Add header
    doc.setFontSize(20)
    doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, 14, 15)
    
    // Add filters info
    doc.setFontSize(10)
    if (filters.startDate) {
      doc.text(`Period: ${formatDate(filters.startDate)} - ${formatDate(filters.endDate || new Date())}`, 14, 25)
    }
    
    // Generate table data
    const tableData = data.map(item => {
      return columns.map(column => {
        switch (column) {
          case 'date':
            return formatDate(item.date)
          case 'total':
            return formatCurrency(item.total)
          default:
            return item[column as keyof typeof item] || ''
        }
      })
    })

    doc.autoTable({
      head: [columns.map(col => col.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '))],
      body: tableData,
      startY: 35,
      theme: 'grid'
    })

    return doc
  }

  static generateExcel(type: ReportType, filters: ReportFilter, columns: string[]) {
    const data = this.getFilteredData(type, filters)
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(item => {
        const row: Record<string, any> = {}
        columns.forEach(column => {
          row[column] = item[column as keyof typeof item]
        })
        return row
      })
    )
    
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, type)
    
    return workbook
  }

  static generateCSV(type: ReportType, filters: ReportFilter, columns: string[]) {
    const data = this.getFilteredData(type, filters)
    const rows = [
      columns.join(','),
      ...data.map(item => 
        columns.map(column => 
          item[column as keyof typeof item]
        ).join(',')
      )
    ]
    
    return rows.join('\n')
  }
} 
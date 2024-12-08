export type ReportType = 
  | 'sales'
  | 'inventory'
  | 'estimates'
  | 'products'
  | 'customers'
  | 'employees'

export type ReportPeriod = 
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly'
  | 'custom'

export interface ReportFilter {
  startDate?: Date
  endDate?: Date
  period?: ReportPeriod
  category?: string
  employee?: string
  status?: string
}

export interface ReportTemplate {
  id: string
  name: string
  type: ReportType
  description: string
  filters: ReportFilter
  columns: string[]
  scheduled?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    recipients: string[]
    lastSent?: Date
  }
}

// Sample report templates
export const reportTemplates: ReportTemplate[] = [
  {
    id: "RPT001",
    name: "Monthly Sales Summary",
    type: "sales",
    description: "Overview of sales performance with product breakdown",
    filters: {
      period: "monthly"
    },
    columns: [
      "date",
      "total_sales",
      "total_revenue",
      "average_order_value",
      "top_products"
    ]
  },
  // Add more templates...
] 
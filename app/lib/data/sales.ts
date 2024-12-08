export interface SaleItem {
  productId: string
  quantity: number
  priceAtSale: number
}

export interface Sale {
  id: string
  items: SaleItem[]
  customerId?: string
  customerName?: string
  total: number
  paymentMethod: 'cash' | 'credit_card' | 'paypal'
  status: 'completed' | 'refunded' | 'partially_refunded'
  date: Date
  employeeId: string
  notes?: string
}

// Sample data
export const salesData: Sale[] = [
  {
    id: "S001",
    items: [
      { productId: "1", quantity: 2, priceAtSale: 999.99 }
    ],
    customerName: "John Doe",
    total: 1999.98,
    paymentMethod: "credit_card",
    status: "completed",
    date: new Date("2024-03-15"),
    employeeId: "E001",
  },
  // Add more sample sales...
] 
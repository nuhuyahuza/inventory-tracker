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
  status: 'pending' | 'completed' | 'refunded' | 'partially_refunded'
  date: Date
  employeeId: string
  notes?: string
}

// Sample data
export const salesData: Sale[] = [
  {
    id: "SALE001",
    date: new Date(),
    customerName: "John Doe",
    employeeId: "EMP001",
    paymentMethod: "credit_card",
    items: [
      { productId: "1", quantity: 2, priceAtSale: 99.99 }
    ],
    total: 199.98,
    status: "completed" as const
  },
  {
    id: "SALE002", 
    date: new Date(Date.now() - 86400000), // Yesterday
    customerName: "Jane Smith",
    employeeId: "EMP002",
    paymentMethod: "cash",
    items: [
      { productId: "2", quantity: 1, priceAtSale: 149.99 }
    ],
    total: 149.99,
    status: "pending" as const
  },
  {
    id: "SALE003",
    date: new Date(Date.now() - 172800000), // 2 days ago
    customerName: "Bob Wilson",
    employeeId: "EMP001",
    paymentMethod: "paypal",
    items: [
      { productId: "3", quantity: 3, priceAtSale: 79.99 }
    ],
    total: 239.97,
    status: "refunded" as const
  },
  {
    id: "SALE004",
    date: new Date(Date.now() - 259200000), // 3 days ago
    customerName: "Alice Brown",
    employeeId: "EMP003",
    paymentMethod: "credit_card",
    items: [
      { productId: "3", quantity: 1, priceAtSale: 299.99 },
      { productId: "1", quantity: 2, priceAtSale: 49.99 }
    ],
    total: 399.97,
    status: "partially_refunded" as const
  },
  {
    id: "SALE005",
    date: new Date(Date.now() - 345600000), // 4 days ago
    customerName: "Charlie Davis",
    employeeId: "EMP002",
    paymentMethod: "cash",
    items: [
      { productId: "1", quantity: 1, priceAtSale: 199.99 }
    ],
    total: 199.99,
    status: "completed" as const
  },
  {
    id: "SALE006",
    date: new Date(Date.now() - 432000000), // 5 days ago
    customerName: "Eve Johnson",
    employeeId: "EMP001",
    paymentMethod: "paypal",
    items: [
      { productId: "2", quantity: 2, priceAtSale: 89.99 }
    ],
    total: 179.98,
    status: "pending" as const
  },
  {
    id: "SALE007",
    date: new Date(),
    customerName: "David Miller",
    employeeId: "EMP001",
    paymentMethod: "credit_card",
    items: [
      { productId: "2", quantity: 1, priceAtSale: 129.99 }
    ],
    total: 129.99,
    status: "pending"
  },
  {
    id: "SALE008",
    date: new Date(Date.now() - 172800000), // 2 days ago
    customerName: "Grace Wilson",
    employeeId: "EMP002",
    paymentMethod: "credit_card",
    items: [
      { productId: "3", quantity: 1, priceAtSale: 199.99 }
    ],
    total: 199.99,
    status: "refunded" as const
  },
  {
    id: "SALE009",
    date: new Date(Date.now() - 259200000), // 3 days ago
    customerName: "Henry Brown",
    employeeId: "EMP003",
    paymentMethod: "credit_card",
    items: [
      { productId: "2", quantity: 2, priceAtSale: 89.99 }
    ],
    total: 179.98,
    status: "refunded" as const
  }
]
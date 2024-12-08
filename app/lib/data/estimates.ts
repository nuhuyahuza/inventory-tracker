export interface EstimateItem {
  productId: string
  quantity: number
  price: number
}

export interface Estimate {
  id: string
  items: EstimateItem[]
  customerId?: string
  customerName: string
  customerEmail?: string
  total: number
  status: 'pending' | 'accepted' | 'rejected' | 'expired' | 'converted'
  createdAt: Date
  validUntil: Date
  notes?: string
}

export const estimates: Estimate[] = [
  {
    id: "EST001",
    items: [
      { productId: "1", quantity: 2, price: 999.99 }
    ],
    customerName: "John Doe",
    customerEmail: "john@example.com",
    total: 1999.98,
    status: "pending",
    createdAt: new Date("2024-03-15"),
    validUntil: new Date("2024-04-15"),
    notes: "Customer requested bulk pricing"
  },
  // Add more sample estimates...
] 
export interface SaleItem {
  productId: string
  quantity: number
  price: number
  priceAtSale?: number
}

export interface Sale {
  id: string
  date: Date
  customerName?: string
  items: SaleItem[]
  total: number
  status: 'completed' | 'refunded' | 'partially_refunded'
} 
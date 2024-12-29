export interface Category {
  id: string
  name: string
}

export interface InventoryItem {
  id: string
  sku: string
  name: string
  category_id: string
  category: {
    name: string
  }
  quantity: number
  price: number
  min_stock_level: number
  last_updated: string
}

export interface Estimate {
  id: string
  customerName: string
  customerEmail: string
  total: number
  status: string
  createdAt: Date
  validUntil: Date
}
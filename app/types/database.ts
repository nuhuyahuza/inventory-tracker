export interface Category {
  id: string
  name: string
}

export interface InventoryItem {
  id: string
  sku: string
  name: string
  category: string
  quantity: number
  price: number
  minStockLevel: number
  lastUpdated: Date
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
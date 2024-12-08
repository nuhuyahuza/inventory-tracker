export interface EstimateTemplate {
  id: string
  name: string
  description?: string
  items: {
    productId: string
    quantity: number
    price: number
  }[]
  notes?: string
  validityPeriod: number // in days
  createdAt: Date
  lastUsed?: Date
  useCount: number
}

export const estimateTemplates: EstimateTemplate[] = [
  {
    id: "TMPL001",
    name: "Basic Computer Setup",
    description: "Standard computer setup with basic peripherals",
    items: [
      { productId: "1", quantity: 1, price: 999.99 }, // Laptop
      { productId: "2", quantity: 1, price: 79.99 },  // Mouse
      { productId: "3", quantity: 1, price: 129.99 }, // Keyboard
    ],
    notes: "Includes basic setup and configuration",
    validityPeriod: 30,
    createdAt: new Date("2024-01-01"),
    useCount: 15
  },
  // Add more templates...
] 
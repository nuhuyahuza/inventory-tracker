export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  minStockLevel: number;
  lastUpdated: Date;
};

export type Category = {
  id: string;
  name: string;
};

export const categories: Category[] = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Office Supplies' },
  { id: '3', name: 'Furniture' },
];

export const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    sku: 'LAP001',
    name: 'Laptop',
    category: 'Electronics',
    quantity: 5,
    price: 999.99,
    minStockLevel: 3,
    lastUpdated: new Date('2024-03-15'),
  },
  {
    id: '2',
    sku: 'LAP001',
    name: 'Desk Chair',
    category: 'Furniture',
    quantity: 2,
    price: 129.99,
    minStockLevel: 4,
    lastUpdated: new Date('2024-03-14'),
  },
  {
	id: '3',
	sku: 'PPR001',
	name: 'Printer Paper',
	category: 'Office Supplies',
	quantity: 100,
	price: 19.99,
	minStockLevel: 50,
    lastUpdated: new Date('2024-03-13'),
  },
];

export const estimates = [
  {
    id: "EST-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    total: 1500.00,
    status: "pending",
    createdAt: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  },
  // Add more sample estimates as needed
]

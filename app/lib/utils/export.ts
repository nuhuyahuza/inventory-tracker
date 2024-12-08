import { InventoryItem } from "@/lib/data"

export function exportToCSV(items: InventoryItem[]) {
  const headers = [
    "Name",
    "SKU",
    "Category",
    "Price",
    "Quantity",
    "Min Stock Level",
    "Description",
    "Supplier",
    "Last Updated"
  ]

  const csvContent = [
    headers.join(","),
    ...items.map(item => [
      item.name,
      item.sku,
      item.category,
      item.price,
      item.quantity,
      item.minStockLevel,
      item.description || "",
      item.supplier || "",
      item.lastUpdated.toISOString()
    ].join(","))
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  
  link.setAttribute("href", url)
  link.setAttribute("download", `inventory_export_${new Date().toISOString()}.csv`)
  link.style.visibility = "hidden"
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
} 
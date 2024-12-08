import { jsPDF } from "jspdf"
import "jspdf-autotable"
import autoTable from 'jspdf-autotable'
import { Estimate } from "@/lib/data/estimates"
import { inventoryItems } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

declare module 'jspdf' {
  interface jsPDF {
    autoTable: typeof autoTable
  }
}

export function generateEstimatePDF(estimate: Estimate) {
  const doc = new jsPDF()
  
  // Add company header
  doc.setFontSize(20)
  doc.text("Company Name", 14, 15)
  
  doc.setFontSize(12)
  doc.text("Estimate", 14, 25)
  doc.text(`Estimate #: ${estimate.id}`, 14, 32)
  doc.text(`Date: ${estimate.createdAt.toLocaleDateString()}`, 14, 39)
  doc.text(`Valid Until: ${estimate.validUntil.toLocaleDateString()}`, 14, 46)
  
  // Add customer information
  doc.text("Customer Information:", 14, 60)
  doc.text(`Name: ${estimate.customerName}`, 14, 67)
  if (estimate.customerEmail) {
    doc.text(`Email: ${estimate.customerEmail}`, 14, 74)
  }
  
  // Add items table
  const tableData = estimate.items.map(item => {
    const product = inventoryItems.find(p => p.id === item.productId)
    return [
      product?.name || 'Unknown Product',
      item.quantity.toString(),
      formatCurrency(item.price),
      formatCurrency(item.quantity * item.price)
    ]
  })
  
  autoTable(doc, {
    startY: 85,
    head: [['Product', 'Quantity', 'Price', 'Total']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [66, 66, 66] }
  })
  
  // Add total
  const finalY = (doc as any).lastAutoTable.finalY + 10
  doc.text(`Total: ${formatCurrency(estimate.total)}`, 14, finalY)
  
  // Add notes if present
  if (estimate.notes) {
    doc.text("Notes:", 14, finalY + 10)
    doc.setFontSize(10)
    doc.text(estimate.notes, 14, finalY + 17)
  }
  
  // Add terms and conditions
  doc.setFontSize(10)
  const termsY = estimate.notes ? finalY + 30 : finalY + 15
  doc.text("Terms and Conditions:", 14, termsY)
  doc.text("1. This estimate is valid until the date specified above.", 14, termsY + 7)
  doc.text("2. Prices are subject to change if not accepted within the valid period.", 14, termsY + 14)
  
  return doc
} 
import { Sale, SaleItem } from "@/lib/data/sales"
import { inventoryItems } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

export function generateReceiptHTML(sale: Sale) {
  const items = sale.items.map(item => {
    const product = inventoryItems.find(p => p.id === item.productId)
    return {
      name: product?.name || 'Unknown Product',
      quantity: item.quantity,
      price: item.priceAtSale,
      total: item.quantity * item.priceAtSale
    }
  })

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .receipt { max-width: 300px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .items { margin: 20px 0; }
          .item { margin: 10px 0; }
          .total { border-top: 1px solid #000; padding-top: 10px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h2>Sales Receipt</h2>
            <p>Receipt #: ${sale.id}</p>
            <p>Date: ${sale.date.toLocaleDateString()}</p>
            ${sale.customerName ? `<p>Customer: ${sale.customerName}</p>` : ''}
          </div>
          
          <div class="items">
            ${items.map(item => `
              <div class="item">
                <p>${item.name}</p>
                <p>${item.quantity} x ${formatCurrency(item.price)} = ${formatCurrency(item.total)}</p>
              </div>
            `).join('')}
          </div>
          
          <div class="total">
            <h3>Total: ${formatCurrency(sale.total)}</h3>
            <p>Payment Method: ${sale.paymentMethod}</p>
          </div>
          
          <div class="footer">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function printReceipt(sale: Sale) {
  const receiptWindow = window.open('', '_blank')
  if (receiptWindow) {
    receiptWindow.document.write(generateReceiptHTML(sale))
    receiptWindow.document.close()
    receiptWindow.print()
  }
}

export function downloadReceipt(sale: Sale) {
  const blob = new Blob([generateReceiptHTML(sale)], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `receipt-${sale.id}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
} 
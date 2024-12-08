"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShoppingCart } from "lucide-react"
import { Estimate } from "@/lib/data/estimates"
import { formatCurrency } from "@/lib/utils"

interface ConvertToSaleButtonProps {
  estimate: Estimate
}

export function ConvertToSaleButton({ estimate }: ConvertToSaleButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>("")

  const handleConvert = async () => {
    if (!paymentMethod) return

    // Here you would typically:
    // 1. Create a new sale record
    // 2. Update the estimate status to 'converted'
    // 3. Update inventory quantities
    // 4. Generate a sale receipt
    
    const saleData = {
      items: estimate.items,
      customerId: estimate.customerId,
      customerName: estimate.customerName,
      total: estimate.total,
      paymentMethod,
      date: new Date(),
      status: 'completed' as const,
    }

    // For now, we'll just log the data
    console.log('Converting estimate to sale:', saleData)
    
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Convert to Sale
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convert Estimate to Sale</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Customer</h3>
            <p>{estimate.customerName}</p>
            {estimate.customerEmail && (
              <p className="text-sm text-muted-foreground">
                {estimate.customerEmail}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-2">Items</h3>
            <ul className="space-y-2">
              {estimate.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.quantity}x Product</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Payment Method</h3>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-medium">Total Amount</span>
            <span className="text-xl font-bold">
              {formatCurrency(estimate.total)}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConvert}
            disabled={!paymentMethod}
          >
            Complete Sale
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
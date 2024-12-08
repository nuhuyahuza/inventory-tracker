"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sale, SaleItem } from "@/lib/data/sales"
import { formatCurrency } from "@/lib/utils"

const refundSchema = z.object({
  items: z.array(z.object({
    itemId: z.string(),
    quantity: z.number().min(1),
    selected: z.boolean()
  })),
  reason: z.string().min(1, "Reason is required"),
})

interface RefundDialogProps {
  sale: Sale
  onRefund: (refundData: any) => void
}

export function RefundDialog({ sale, onRefund }: RefundDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<z.infer<typeof refundSchema>>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      items: sale.items.map(item => ({
        itemId: item.productId,
        quantity: item.quantity,
        selected: false
      })),
      reason: "",
    },
  })

  const calculateRefundAmount = (values: z.infer<typeof refundSchema>) => {
    return values.items.reduce((total, item) => {
      if (!item.selected) return total
      const saleItem = sale.items.find(si => si.productId === item.itemId)
      return total + (saleItem?.priceAtSale || 0) * item.quantity
    }, 0)
  }

  const onSubmit = (values: z.infer<typeof refundSchema>) => {
    const refundAmount = calculateRefundAmount(values)
    onRefund({
      saleId: sale.id,
      items: values.items.filter(item => item.selected),
      reason: values.reason,
      amount: refundAmount
    })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Process Refund</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Process Refund</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              {form.watch("items").map((item, index) => {
                const saleItem = sale.items.find(si => si.productId === item.itemId)
                return (
                  <div key={item.itemId} className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.selected`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {saleItem?.productId} - {formatCurrency(saleItem?.priceAtSale || 0)}
                            </p>
                            <Input
                              type="number"
                              min={1}
                              max={saleItem?.quantity}
                              {...form.register(`items.${index}.quantity`)}
                              disabled={!field.value}
                            />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )
              })}
            </div>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refund Reason</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <span>Refund Amount:</span>
              <span className="font-bold">
                {formatCurrency(calculateRefundAmount(form.getValues()))}
              </span>
            </div>

            <Button type="submit" className="w-full">
              Process Refund
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 
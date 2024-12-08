"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { inventoryItems } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

const saleSchema = z.object({
  customerName: z.string().optional(),
  paymentMethod: z.enum(["cash", "credit_card", "paypal"]),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
  })).min(1, "At least one item is required"),
})

export function NewSaleForm() {
  const [selectedItems, setSelectedItems] = useState<Array<{
    productId: string;
    quantity: number;
    price: number;
  }>>([])

  const form = useForm<z.infer<typeof saleSchema>>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      paymentMethod: "cash",
      items: [],
    },
  })

  const total = selectedItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  )

  const onSubmit = (values: z.infer<typeof saleSchema>) => {
    console.log({ ...values, total })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Form fields here */}
        <div className="flex justify-between items-center py-4 border-t">
          <div className="text-lg font-semibold">Total</div>
          <div className="text-2xl font-bold">{formatCurrency(total)}</div>
        </div>
        
        <Button type="submit" className="w-full">
          Complete Sale
        </Button>
      </form>
    </Form>
  )
} 
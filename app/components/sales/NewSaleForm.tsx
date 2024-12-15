"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "react-hot-toast"

const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  items: z.array(z.object({
    name: z.string().min(1, "Item name is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be positive")
  })).min(1, "At least one item is required"),
})

type FormValues = z.infer<typeof formSchema>

export function NewSaleForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      items: [{ name: "", quantity: 1, price: 0 }]
    }
  })

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true)
      // Add API call here to create sale
      console.log(data)
      toast.success("Sale created successfully")
      router.push("/dashboard/sales")
      router.refresh()
    } catch (error) {
      toast.error("Failed to create sale")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Add item fields here */}
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Sale"}
        </Button>
      </form>
    </Form>
  )
} 
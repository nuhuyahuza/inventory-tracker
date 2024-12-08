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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { inventoryItems } from "@/lib/data"
import { Estimate } from "@/lib/data/estimates"
import { formatCurrency } from "@/lib/utils"

const estimateSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email().optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0)
  })).min(1, "At least one item is required"),
  validUntil: z.string(),
  notes: z.string().optional(),
})

interface EstimateFormProps {
  initialData?: Estimate
  onSubmit: (data: z.infer<typeof estimateSchema>) => void
}

export function EstimateForm({ initialData, onSubmit }: EstimateFormProps) {
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    productId: string;
    quantity: number;
    price: number;
  }>>(initialData?.items || [])

  const form = useForm<z.infer<typeof estimateSchema>>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      customerName: initialData?.customerName || "",
      customerEmail: initialData?.customerEmail || "",
      validUntil: initialData?.validUntil.toISOString().split('T')[0] || 
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: initialData?.notes || "",
      items: initialData?.items || [],
    },
  })

  const total = selectedProducts.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  )

  const handleAddProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      { productId: "", quantity: 1, price: 0 }
    ])
  }

  const handleRemoveProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Products</h3>
            <Button type="button" onClick={handleAddProduct}>
              Add Product
            </Button>
          </div>

          {selectedProducts.map((product, index) => (
            <div key={index} className="flex gap-4 items-end">
              <FormField
                control={form.control}
                name={`items.${index}.productId`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Product</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const product = inventoryItems.find(p => p.id === value)
                        if (product) {
                          const newProducts = [...selectedProducts]
                          newProducts[index] = {
                            ...newProducts[index],
                            productId: value,
                            price: product.price
                          }
                          setSelectedProducts(newProducts)
                        }
                        field.onChange(value)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {inventoryItems.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name} - {formatCurrency(item.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`items.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value)
                          const newProducts = [...selectedProducts]
                          newProducts[index] = {
                            ...newProducts[index],
                            quantity: value
                          }
                          setSelectedProducts(newProducts)
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveProduct(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        <FormField
          control={form.control}
          name="validUntil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valid Until</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center py-4 border-t">
          <div className="text-lg font-semibold">Total</div>
          <div className="text-2xl font-bold">{formatCurrency(total)}</div>
        </div>

        <Button type="submit" className="w-full">
          {initialData ? "Update Estimate" : "Create Estimate"}
        </Button>
      </form>
    </Form>
  )
} 
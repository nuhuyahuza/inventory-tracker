"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
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
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { inventoryItems as products } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

const estimateItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  description: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  amount: z.number(),
})

const estimateSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  validUntil: z.string(),
  items: z.array(estimateItemSchema).min(1, "Add at least one item"),
  notes: z.string().optional(),
  terms: z.string().optional(),
  subTotal: z.number().optional(),
  tax: z.number().optional(),
  total: z.number().optional(),
})

type EstimateFormValues = z.infer<typeof estimateSchema>

interface CreateEstimateFormProps {
  onSuccess?: () => void
}

export function CreateEstimateForm({ onSuccess }: CreateEstimateFormProps) {
  const router = useRouter()
  const form = useForm<EstimateFormValues>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      validUntil: "",
      items: [{ productId: "", description: "", quantity: 1, unitPrice: 0, amount: 0 }],
      notes: "",
      terms: "",
      subTotal: 0,
      tax: 0,
      total: 0,
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  })

  // Handle product selection
  const handleProductSelect = (productId: string, index: number) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      form.setValue(`items.${index}.description`, product.name || product.category)
      form.setValue(`items.${index}.unitPrice`, product.price)
      // Calculate amount
      const quantity = form.getValues(`items.${index}.quantity`)
      form.setValue(`items.${index}.amount`, Number(quantity) * product.price)
      calculateTotals()
    }
  }

  // Handle quantity change
  const handleQuantityChange = (quantity: string, index: number) => {
    const unitPrice = form.getValues(`items.${index}.unitPrice`)
    form.setValue(`items.${index}.amount`, (Number(quantity) * Number(unitPrice)))
    calculateTotals()
  }

  // Calculate subtotal, tax, and total
  const calculateTotals = () => {
    const items = form.getValues("items")
    const subtotal = items.reduce((sum, item) => sum + Number(item.amount), 0)
    const tax = subtotal * 0.1 // 10% tax rate - adjust as needed
    const total = subtotal + tax

    form.setValue("subTotal", subtotal)
    form.setValue("tax", tax)
    form.setValue("total", total)
  }

  async function onSubmit(data: EstimateFormValues) {
    try {
      // TODO: Implement API call
      console.log(data)
      toast.success("Estimate created successfully")
      onSuccess?.()
      router.refresh()
    } catch (error) {
      console.error("Failed to create estimate:", error)
      toast.error("Failed to create estimate")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="customer@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Estimate Items</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ 
                productId: "", 
                description: "", 
                quantity: 1, 
                unitPrice: 0, 
                amount: 0 
              })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`items.${index}.productId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleProductSelect(value, index)
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map(product => (
                            <SelectItem 
                              key={product.id} 
                              value={product.id}
                            >
                              {product.name} ({formatCurrency(product.price)})
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
                  name={`items.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              handleQuantityChange(e.target.value, index)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.unitPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Price</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-destructive hover:text-destructive"
                  onClick={() => {
                    remove(index)
                    calculateTotals()
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Item
                </Button>
              )}
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any notes..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms & Conditions</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add terms and conditions..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Card className="p-4 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(form.watch("subTotal") || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>{formatCurrency(form.watch("tax") || 0)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(form.watch("total") || 0)}</span>
            </div>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button type="submit">Create Estimate</Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/dashboard/estimates")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
} 
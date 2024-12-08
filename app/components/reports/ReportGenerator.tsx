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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ReportType, ReportPeriod } from "@/lib/data/reports"
import { Card } from "@/components/ui/card"

const reportSchema = z.object({
  type: z.string(),
  period: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  includeCharts: z.boolean().default(true),
  format: z.enum(["pdf", "excel", "csv"]),
  columns: z.array(z.string())
})

interface ReportGeneratorProps {
  defaultType?: ReportType
  onGenerate: (data: z.infer<typeof reportSchema>) => void
}

export function ReportGenerator({ defaultType, onGenerate }: ReportGeneratorProps) {
  const [showDateRange, setShowDateRange] = useState(false)

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      type: defaultType || "sales",
      period: "monthly",
      includeCharts: true,
      format: "pdf",
      columns: []
    }
  })

  const availableColumns = {
    sales: [
      "date",
      "order_id",
      "customer",
      "products",
      "total",
      "payment_method",
      "status"
    ],
    inventory: [
      "product_id",
      "name",
      "quantity",
      "reorder_level",
      "last_updated"
    ],
    // Add more column options for other report types
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onGenerate)} className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sales">Sales Report</SelectItem>
                    <SelectItem value="inventory">Inventory Report</SelectItem>
                    <SelectItem value="estimates">Estimates Report</SelectItem>
                    <SelectItem value="products">Product Performance</SelectItem>
                    <SelectItem value="customers">Customer Analysis</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Period</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value)
                    setShowDateRange(value === 'custom')
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {showDateRange && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="columns"
            render={() => (
              <FormItem>
                <FormLabel>Columns to Include</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {availableColumns[form.watch('type') as keyof typeof availableColumns]?.map((column) => (
                    <FormField
                      key={column}
                      control={form.control}
                      name="columns"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={column}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(column)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, column])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== column
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {column.split('_').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Export Format</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select export format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Generate Report</Button>
        </form>
      </Form>
    </Card>
  )
} 
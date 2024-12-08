"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { salesData } from "@/lib/data/sales"
import { formatCurrency, formatDistanceToNow } from "@/lib/utils"

export function RecentActivity() {
  // Get last 10 activities
  const recentActivities = salesData
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10)
    .map(sale => ({
      type: 'sale',
      id: sale.id,
      customer: sale.customerName,
      amount: sale.total,
      date: sale.date,
      status: sale.status
    }))

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.customer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(activity.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.date)}
                  </p>
                </div>
                <Badge 
                  variant={activity.status === 'completed' ? 'default' : 'secondary'}
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 
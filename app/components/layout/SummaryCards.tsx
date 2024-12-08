import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { inventoryItems, categories } from "@/lib/data";

export function SummaryCards() {
  const lowStockItems = inventoryItems.filter(
    item => item.quantity < item.minStockLevel
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{inventoryItems.length}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{lowStockItems.length}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{categories.length}</p>
        </CardContent>
      </Card>
    </div>
  );
}

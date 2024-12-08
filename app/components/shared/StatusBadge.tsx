import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  quantity: number;
  minStockLevel: number;
}

export function StatusBadge({ quantity, minStockLevel }: StatusBadgeProps) {
  if (quantity === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  }
  if (quantity < minStockLevel) {
    return <Badge variant="warning">Low Stock</Badge>;
  }
  return <Badge variant="success">In Stock</Badge>;
}

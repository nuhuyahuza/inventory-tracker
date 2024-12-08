import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../shared/StatusBadge";
import { inventoryItems } from "@/lib/data";
import { EditItemDialog } from "./EditItemDialog"
import { DeleteItemDialog } from "./DeleteItemDialog"

export function InventoryTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <StatusBadge
                  quantity={item.quantity}
                  minStockLevel={item.minStockLevel}
                />
              </TableCell>
              <TableCell>
                {item.lastUpdated.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <EditItemDialog item={item} />
                  <DeleteItemDialog item={item} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

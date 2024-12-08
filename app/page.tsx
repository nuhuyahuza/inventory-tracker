import { Header } from "@/components/layout/Header";
import { SummaryCards } from "@/components/layout/SummaryCards";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AddItemDialog } from "@/components/inventory/AddItemDialog"

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />
        <SummaryCards />
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Inventory Items</h2>
            <AddItemDialog />
          </div>
          <InventoryTable />
        </div>
      </div>
    </main>
  );
}

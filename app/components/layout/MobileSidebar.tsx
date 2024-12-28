import { useMobileMenu } from "@/store/mobile-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"

export function MobileSidebar() {
  const { isOpen, close } = useMobileMenu()

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent side="left" className="p-0 w-72">
        <Sidebar className="border-0" />
      </SheetContent>
    </Sheet>
  )
} 
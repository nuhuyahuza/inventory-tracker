"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Download, Send } from "lucide-react"
import { salesData } from "@/lib/data/sales"
import { generateSalePDF } from "@/lib/utils/pdf"

interface ViewSaleButtonProps {
  saleId: string
}

export function ViewSaleButton({ saleId }: ViewSaleButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const sale = salesData.find(s => s.id === saleId)

  if (!sale) return null

  const handleDownload = () => {
    const doc = generateSalePDF(sale)
    doc.save(`sale-${sale.id}.pdf`)
  }

  const handleEmail = async () => {
    const doc = generateSalePDF(sale)
    const pdfBlob = doc.output('blob')
    console.log(pdfBlob);
    
    // Here you would typically send this to your API
    // For now, we'll just show an alert
    alert("Email functionality would be implemented here")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Sale #{sale.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handleEmail}>
              <Send className="h-4 w-4 mr-2" />
              Email to Customer
            </Button>
          </div>
          
          <iframe
            src={generateSalePDF(sale).output('datauristring')}
            className="w-full h-[600px] border rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
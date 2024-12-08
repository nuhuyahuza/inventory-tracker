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
import { Estimate } from "@/lib/data/estimates"
import { generateEstimatePDF } from "@/lib/utils/pdf"

interface ViewEstimateButtonProps {
  estimate: Estimate
}

export function ViewEstimateButton({ estimate }: ViewEstimateButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDownload = () => {
    const doc = generateEstimatePDF(estimate)
    doc.save(`estimate-${estimate.id}.pdf`)
  }

  const handleEmail = async () => {
    const doc = generateEstimatePDF(estimate)
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
          <DialogTitle>Estimate #{estimate.id}</DialogTitle>
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
            src={generateEstimatePDF(estimate).output('datauristring')}
            className="w-full h-[600px] border rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 
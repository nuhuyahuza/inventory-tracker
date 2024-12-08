"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  RotateCcw, 
  Eye, 
  FileText,
  AlertCircle 
} from "lucide-react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

interface RejectedEstimateActionsProps {
  estimateId: string
}

export function RejectedEstimateActions({ estimateId }: RejectedEstimateActionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const handleRevive = async () => {
    try {
      // TODO: Implement API call to revive estimate
      toast.success("Estimate revived successfully")
      setIsDialogOpen(false)
      router.refresh()
    } catch (error) {
      toast.error(error+ "Failed to revive estimate")
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/estimates/${estimateId}`)}>
        <Eye className="h-4 w-4 mr-2" />
        View
      </Button>
      
      <Button variant="ghost" size="sm">
        <FileText className="h-4 w-4 mr-2" />
        PDF
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-yellow-600 hover:text-yellow-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Revive
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Revive Rejected Estimate
            </DialogTitle>
            <DialogDescription>
              This will create a new draft estimate with the same details. 
              The rejected estimate will be kept for reference.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRevive}>
              Revive Estimate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
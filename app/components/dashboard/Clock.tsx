"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="p-4 flex items-center gap-3">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <div className="text-sm">
        <p className="font-medium">
          {time.toLocaleTimeString()}
        </p>
        <p className="text-muted-foreground">
          {time.toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </Card>
  )
} 
import { NotFound } from "@/components/shared/NotFound"

export default function RootNotFound() {
  return (
    <NotFound 
      backPath="/dashboard"
      backLabel="Go to Dashboard"
    />
  )
} 
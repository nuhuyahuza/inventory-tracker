import { NotFound } from "@/components/shared/NotFound"

export default function EstimatesNotFound() {
  return (
    <NotFound 
      title="Estimate Not Found"
      description="Sorry, we couldn't find the estimate page you're looking for."
      backPath="/dashboard/estimates"
      backLabel="Go to Estimates"
    />
  )
} 
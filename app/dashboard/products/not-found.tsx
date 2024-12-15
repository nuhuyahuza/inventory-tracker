import { NotFound } from "@/components/shared/NotFound"

export default function ProductsNotFound() {
  return (
    <NotFound 
      title="Product Not Found"
      description="Sorry, we couldn't find the product page you're looking for."
      backPath="/dashboard/products"
      backLabel="Go to Products"
    />
  )
}
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict, format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date: Date) {
  return format(date, 'MMM dd, yyyy')
}

export function formatDistanceToNow(date: Date) {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    roundingMethod: 'floor'
  })
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

// Example usage:
// formatDistanceToNow(new Date(2024, 0, 1)) -> "2 months ago"
// formatDistanceToNow(new Date()) -> "less than a minute ago"
// formatDistanceToNow(new Date(Date.now() - 24 * 60 * 60 * 1000)) -> "1 day ago"
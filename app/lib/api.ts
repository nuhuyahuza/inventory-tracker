import { supabase } from './supabase'
import type { Category, InventoryItem, Estimate } from '@/types/database'

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
  
  if (error) throw error
  return data as Category[]
}

export async function getInventoryItems() {
  const { data, error } = await supabase
    .from('inventory_items')
    .select(`
      *,
      categories (
        name
      )
    `)
  
  if (error) throw error
  return data as InventoryItem[]
}

export async function getEstimates() {
  const { data, error } = await supabase
    .from('estimates')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Estimate[]
} 
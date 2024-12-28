import { supabase } from '@/lib/supabase'
import type { InventoryItem } from '@/types/database'

export const InventoryService = {
  async getAll() {
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
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('inventory_items')
      .select(`
        *,
        categories (
          name
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as InventoryItem
  },

  async create(item: Omit<InventoryItem, 'id'>) {
    const { data, error } = await supabase
      .from('inventory_items')
      .insert(item)
      .select()
      .single()

    if (error) throw error
    return data as InventoryItem
  },

  async update(id: string, item: Partial<InventoryItem>) {
    const { data, error } = await supabase
      .from('inventory_items')
      .update(item)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as InventoryItem
  },

  async updateStock(id: string, quantity: number) {
    const { data, error } = await supabase
      .from('inventory_items')
      .update({ quantity })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as InventoryItem
  }
} 
import { supabase } from '@/lib/supabase'
import type { Estimate } from '@/types/database'

export const EstimateService = {
  async getAll() {
    const { data, error } = await supabase
      .from('estimates')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Estimate[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('estimates')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Estimate
  },

  async create(estimate: Omit<Estimate, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('estimates')
      .insert(estimate)
      .select()
      .single()

    if (error) throw error
    return data as Estimate
  },

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('estimates')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Estimate
  }
} 
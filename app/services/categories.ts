import { supabase } from '@/lib/supabase'
import type { Category } from '@/types/database'

export const CategoryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
    
    if (error) throw error
	console.log('cat_data',data);
    return data as Category[]
  },

  async create(category: Pick<Category, 'name'>) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single()

    if (error) throw error
    return data as Category
  },

  async update(id: string, category: Partial<Category>) {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Category
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
} 
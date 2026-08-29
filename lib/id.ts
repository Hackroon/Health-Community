import { createClient } from '@/lib/supabase/server'
import { generateDisplayId, generateUniqueId, isUniqueId } from '@/lib/security'

async function existsInTable(table: string, id: string): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase.from(table).select('id').eq('id', id).maybeSingle()
  if (error) return true
  return Boolean(data)
}

export async function createFreshId(): Promise<string> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidate = generateUniqueId()
    if (!isUniqueId(candidate)) continue
    const [profileExists, inventoryExists, requestExists, orderExists] = await Promise.all([
      existsInTable('profiles', candidate),
      existsInTable('inventory_items', candidate),
      existsInTable('resource_requests', candidate),
      existsInTable('orders', candidate),
    ])
    if (!profileExists && !inventoryExists && !requestExists && !orderExists) {
      return candidate
    }

    export async function createDisplayId(role: 'hospital' | 'vendor'): Promise<string> {
      const prefix = role === 'vendor' ? 'V' : 'H'
      for (let attempt = 0; attempt < 20; attempt += 1) {
        const candidate = generateDisplayId(prefix)
        const supabase = await createClient()
        const { data, error } = await supabase
          .from('profiles')
          .select('display_id')
          .eq('display_id', candidate)
          .maybeSingle()
        if (!error && !data) return candidate
      }
      throw new Error('Unable to allocate unique display identifier')
    }
  }
  throw new Error('Unable to allocate unique 5-character identifier')
}

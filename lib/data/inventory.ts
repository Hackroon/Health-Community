import { createClient } from '@/lib/supabase/server'
import { createFreshId } from '@/lib/id'

export interface InventoryItem {
  id: string
  hospital_id: string
  name: string
  category: string
  unit: string
  current_quantity: number
  full_capacity: number
  updated_at: string
  created_at: string
}

const DEFAULT_ITEMS = [
  { name: 'Tablets Inventory', category: 'Oral medication stock', unit: 'units', current_quantity: 62, full_capacity: 100 },
  { name: 'Injection Beds Availability', category: 'Treatment capacity', unit: 'beds', current_quantity: 21, full_capacity: 100 },
  { name: 'Glucose / Blood / Bandages', category: 'Critical fluids & consumables', unit: 'units', current_quantity: 14, full_capacity: 100 },
]

export async function getInventoryItems(hospitalId: string): Promise<InventoryItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('hospital_id', hospitalId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[v0] getInventoryItems error:', error.message)
    return []
  }

  if (data && data.length > 0) return data as InventoryItem[]

  // Seed default items for a first-time hospital so the dashboard isn't empty.
  const { data: seeded, error: seedError } = await supabase
    .from('inventory_items')
    .insert(
      await Promise.all(
        DEFAULT_ITEMS.map(async (item) => ({ ...item, id: await createFreshId(), hospital_id: hospitalId })),
      ),
    )
    .select('*')

  if (seedError) {
    console.error('[v0] seed inventory error:', seedError.message)
    return []
  }

  return (seeded as InventoryItem[]) ?? []
}

export function percentageOf(item: InventoryItem): number {
  if (item.full_capacity <= 0) return 0
  return Math.max(0, Math.min(100, (item.current_quantity / item.full_capacity) * 100))
}

/** Finds another hospital with surplus (>= 50%) of a resource matching by name, for cross-network donation. */
export async function findDonorForResource(
  resourceName: string,
  excludeHospitalId: string,
): Promise<{ donorHospitalId: string; orgName: string; location: string | null; percentage: number } | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('inventory_items')
    .select('hospital_id, current_quantity, full_capacity, profiles!inventory_items_hospital_id_fkey(org_name, location)')
    .eq('name', resourceName)
    .neq('hospital_id', excludeHospitalId)

  if (error || !data) {
    console.error('[v0] findDonorForResource error:', error?.message)
    return null
  }

  for (const row of data as unknown as {
    hospital_id: string
    current_quantity: number
    full_capacity: number
    profiles: { org_name: string; location: string | null } | null
  }[]) {
    const pct = row.full_capacity > 0 ? (row.current_quantity / row.full_capacity) * 100 : 0
    if (pct >= 50 && row.profiles) {
      return {
        donorHospitalId: row.hospital_id,
        orgName: row.profiles.org_name,
        location: row.profiles.location,
        percentage: pct,
      }
    }
  }

  return null
}

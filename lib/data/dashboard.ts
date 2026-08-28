import { createClient } from '@/lib/supabase/server'

export async function getHospitalDashboardData() {
  const supabase = await createClient()
  const [{ data: inventory }, { data: requests }, { data: orders }, { data: profiles }] =
    await Promise.all([
      supabase.from('inventory_items').select('*').order('created_at', { ascending: true }),
      supabase
        .from('resource_requests')
        .select('id, resource_name, quantity_requested, status, urgency, created_at, donor_hospital_id, requesting_hospital_id')
        .order('created_at', { ascending: false })
        .limit(12),
      supabase
        .from('orders')
        .select('id, vendor_name, package_name, location, validity_date, vendor_assured, item_received, status, created_at')
        .order('created_at', { ascending: false })
        .limit(12),
      supabase.from('profiles').select('id, org_name, location, role').order('created_at', { ascending: true }),
    ])

  return {
    inventory: inventory ?? [],
    requests: requests ?? [],
    orders: orders ?? [],
    profiles: profiles ?? [],
  }
}

export async function getVendorDashboardData() {
  const supabase = await createClient()
  const [{ data: orders }, { data: profiles }] = await Promise.all([
    supabase
      .from('orders')
      .select('id, vendor_name, package_name, location, validity_date, vendor_assured, item_received, status, created_at')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase.from('profiles').select('id, org_name, location, role').order('created_at', { ascending: true }),
  ])

  return {
    orders: orders ?? [],
    profiles: profiles ?? [],
  }
}

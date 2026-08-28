'use server'

import { createClient } from '@/lib/supabase/server'
import { findDonorForResource } from '@/lib/data/inventory'
import { revalidatePath } from 'next/cache'

export async function updateInventoryQuantity(itemId: string, quantity: number) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const clamped = Math.max(0, Math.round(quantity))

  const { error } = await supabase
    .from('inventory_items')
    .update({ current_quantity: clamped, updated_at: new Date().toISOString() })
    .eq('id', itemId)
    .eq('hospital_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/hospital/overview')
  revalidatePath('/hospital/inventory')
  revalidatePath('/hospital/network')
  return { success: true }
}

export async function createInventoryItem(input: {
  name: string
  category: string
  unit: string
  current_quantity: number
  full_capacity: number
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  if (!input.name.trim()) return { error: 'Name is required' }
  if (input.full_capacity <= 0) return { error: 'Full capacity must be greater than 0' }

  const { error } = await supabase.from('inventory_items').insert({
    hospital_id: user.id,
    name: input.name.trim(),
    category: input.category.trim() || 'General',
    unit: input.unit.trim() || 'units',
    current_quantity: Math.max(0, input.current_quantity),
    full_capacity: input.full_capacity,
  })

  if (error) return { error: error.message }

  revalidatePath('/hospital/overview')
  revalidatePath('/hospital/inventory')
  return { success: true }
}

export async function deleteInventoryItem(itemId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('inventory_items')
    .delete()
    .eq('id', itemId)
    .eq('hospital_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/hospital/overview')
  revalidatePath('/hospital/inventory')
  return { success: true }
}

export async function requestCrossNetworkTransfer(input: {
  resourceName: string
  quantityRequested: number
  inventoryItemId?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const donor = await findDonorForResource(input.resourceName, user.id)

  const { data, error } = await supabase
    .from('resource_requests')
    .insert({
      requesting_hospital_id: user.id,
      donor_hospital_id: donor?.donorHospitalId ?? null,
      inventory_item_id: input.inventoryItemId ?? null,
      resource_name: input.resourceName,
      quantity_requested: Math.max(1, input.quantityRequested),
      status: donor ? 'pending' : 'pending',
      urgency: 'critical',
    })
    .select('id')
    .single()

  if (error) return { error: error.message }

  revalidatePath('/hospital/overview')
  revalidatePath('/hospital/network')
  return { success: true, requestId: data.id, donor }
}

export async function authorizeResourceTransfer(requestId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('resource_requests')
    .update({ status: 'authorized', updated_at: new Date().toISOString() })
    .eq('id', requestId)
    .or(`requesting_hospital_id.eq.${user.id},donor_hospital_id.eq.${user.id}`)

  if (error) return { error: error.message }

  revalidatePath('/hospital/overview')
  revalidatePath('/hospital/network')
  return { success: true }
}

export async function updateProfile(input: {
  orgName: string
  contactEmail: string
  contactPhone: string
  location: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  if (!input.orgName.trim()) return { error: 'Organization name is required' }

  const { error } = await supabase
    .from('profiles')
    .update({
      org_name: input.orgName.trim(),
      contact_email: input.contactEmail.trim() || null,
      contact_phone: input.contactPhone.trim() || null,
      location: input.location.trim() || null,
    })
    .eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/hospital/settings')
  revalidatePath('/hospital/overview')
  return { success: true }
}

export async function createOrder(input: {
  vendorName: string
  packageName: string
  location: string
  validityDate: string
  vendorAssured: boolean
  itemReceived: boolean
  documentName?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  if (!input.packageName.trim()) return { error: 'Package details are required' }

  const { error } = await supabase.from('orders').insert({
    hospital_id: user.id,
    vendor_name: input.vendorName.trim() || 'Unnamed Vendor',
    package_name: input.packageName.trim(),
    location: input.location.trim() || null,
    validity_date: input.validityDate || null,
    vendor_assured: input.vendorAssured,
    item_received: input.itemReceived,
    document_name: input.documentName || null,
    status: input.itemReceived ? 'delivered' : 'pending',
  })

  if (error) return { error: error.message }

  revalidatePath('/hospital/logistics')
  return { success: true }
}

export async function toggleOrderFlag(
  orderId: string,
  field: 'vendor_assured' | 'item_received',
  value: boolean,
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('orders')
    .update({ [field]: value, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .eq('hospital_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/hospital/logistics')
  return { success: true }
}

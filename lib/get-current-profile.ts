import { createClient } from '@/lib/supabase/server'

export interface Profile {
  id: string
  role: 'hospital' | 'vendor'
  org_name: string
  contact_email: string | null
  contact_phone: string | null
  location: string | null
  created_at: string
}

/**
 * Fetches the current authenticated user's profile row.
 * Returns null if there is no session or no matching profile.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, org_name, contact_email, contact_phone, location, created_at')
    .eq('id', user.id)
    .single()

  return (profile as Profile) ?? null
}

import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/get-current-profile'
import { Sidebar } from '@/components/sidebar'

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect('/auth/login')
  }
  if (profile.role !== 'vendor') {
    redirect('/hospital/overview')
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar role="vendor" orgName={profile.org_name} location={profile.location} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

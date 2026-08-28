import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/get-current-profile'
import { Sidebar } from '@/components/sidebar'

export default async function HospitalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect('/auth/login')
  }
  if (profile.role !== 'hospital') {
    redirect('/vendor/overview')
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar role="hospital" orgName={profile.org_name} location={profile.location} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

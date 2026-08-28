import { PageHeader } from '@/components/page-header'
import { getCurrentProfile } from '@/lib/get-current-profile'

export default async function VendorSettingsPage() {
  const profile = await getCurrentProfile()

  return (
    <>
      <PageHeader title="Settings" subtitle="Organization profile and preferences" />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Vendor ID
          </p>
          <p className="text-sm font-semibold text-slate-900">
            {profile?.id.slice(0, 5) ?? 'N/A'}
          </p>
          <p className="text-sm font-semibold text-slate-900">{profile?.org_name ?? 'Vendor profile'}</p>
          <p className="mt-1 text-sm text-slate-600">{profile?.contact_email ?? 'No contact email set'}</p>
          <p className="mt-1 text-sm text-slate-600">{profile?.contact_phone ?? 'No contact phone set'}</p>
          <p className="mt-1 text-sm text-slate-600">{profile?.location ?? 'No location set'}</p>
        </div>
      </main>
    </>
  )
}

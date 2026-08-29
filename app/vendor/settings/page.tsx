import { PageHeader } from '@/components/page-header'

export default function VendorSettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Organization profile and preferences" />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <p className="text-sm text-slate-500">Loading settings...</p>
      </main>
    </>
  )
}

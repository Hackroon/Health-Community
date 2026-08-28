import { PageHeader } from '@/components/page-header'

export default function HospitalInventoryPage() {
  return (
    <>
      <PageHeader
        title="Inventory"
        subtitle="Manage stock items, capacity, and thresholds"
      />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <p className="text-sm text-slate-500">Loading inventory...</p>
      </main>
    </>
  )
}

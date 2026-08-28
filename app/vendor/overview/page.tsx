import { PageHeader } from '@/components/page-header'

export default function VendorOverviewPage() {
  return (
    <>
      <PageHeader
        title="Vendor Overview"
        subtitle="Assigned orders and fulfillment status across hospitals"
      />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <p className="text-sm text-slate-500">Loading assigned orders...</p>
      </main>
    </>
  )
}

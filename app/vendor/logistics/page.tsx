import { PageHeader } from '@/components/page-header'

export default function VendorLogisticsPage() {
  return (
    <>
      <PageHeader
        title="Order Fulfillment"
        subtitle="Update status and documentation for hospital orders"
      />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <p className="text-sm text-slate-500">Loading orders...</p>
      </main>
    </>
  )
}

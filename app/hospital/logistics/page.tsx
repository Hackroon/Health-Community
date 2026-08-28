import { PageHeader } from '@/components/page-header'

export default function HospitalLogisticsPage() {
  return (
    <>
      <PageHeader
        title="Logistics & Order Storage"
        subtitle="Vendor orders, delivery tracking, and documentation"
      />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <p className="text-sm text-slate-500">Loading orders...</p>
      </main>
    </>
  )
}

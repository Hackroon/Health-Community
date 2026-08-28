import { PageHeader } from '@/components/page-header'

export default function HospitalVitalsPage() {
  return (
    <>
      <PageHeader
        title="Vitals"
        subtitle="Facility-wide capacity and utilization signals"
      />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <p className="text-sm text-slate-500">Loading vitals...</p>
      </main>
    </>
  )
}

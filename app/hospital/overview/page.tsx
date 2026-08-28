import { PageHeader } from '@/components/page-header'

export default function HospitalOverviewPage() {
  return (
    <>
      <PageHeader
        title="Resource Optimization Dashboard"
        subtitle="Primary Health Centre logistics network · real-time tracking"
      />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <p className="text-sm text-slate-500">Loading live inventory...</p>
      </main>
    </>
  )
}

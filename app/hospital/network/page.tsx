import { PageHeader } from '@/components/page-header'

export default function HospitalNetworkPage() {
  return (
    <>
      <PageHeader
        title="Network Share"
        subtitle="Cross-network resource requests and donor coordination"
      />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <p className="text-sm text-slate-500">Loading network status...</p>
      </main>
    </>
  )
}

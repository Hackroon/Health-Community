import { PageHeader } from '@/components/page-header'
import { getHospitalDashboardData } from '@/lib/data/dashboard'

export default async function HospitalNetworkPage() {
  const data = await getHospitalDashboardData()

  return (
    <>
      <PageHeader title="Network Share" subtitle="Cross-network resource requests and donor coordination" />
      <main className="flex-1 space-y-6 px-5 py-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">Recent requests</h2>
            <div className="mt-4 space-y-3">
              {data.requests.map((request) => (
                <div key={request.id} className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{request.resource_name}</p>
                      <p className="text-xs text-slate-500">Qty {request.quantity_requested} · {request.urgency}</p>
                    </div>
                    <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">{request.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">Network guidance</h2>
            <p className="mt-3 text-sm text-slate-600">Use stock levels from Inventory to trigger donor outreach when a resource falls below the warning threshold.</p>
            <p className="mt-2 text-sm text-slate-600">Once authorized, requests stay visible here until fulfilled or cleared.</p>
          </section>
        </div>
      </main>
    </>
  )
}

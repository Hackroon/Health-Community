import { PageHeader } from '@/components/page-header'
import { MetricCard, MetricGrid } from '@/components/dashboard-metrics'
import { getVendorDashboardData } from '@/lib/data/dashboard'

export default async function VendorOverviewPage() {
  const data = await getVendorDashboardData()

  return (
    <>
      <PageHeader title="Vendor Overview" subtitle="Assigned orders and fulfillment status across hospitals" />
      <main className="flex-1 space-y-6 px-5 py-6 lg:px-8">
        <MetricGrid>
          <MetricCard label="Open orders" value={String(data.orders.filter((order) => order.status !== 'delivered').length)} detail="Awaiting fulfillment" tone="teal" />
          <MetricCard label="Completed orders" value={String(data.orders.filter((order) => order.status === 'delivered').length)} detail="Marked delivered" tone="emerald" />
          <MetricCard label="Hospitals in network" value={String(data.profiles.filter((profile) => profile.role === 'hospital').length)} detail="Connected buyers" tone="slate" />
          <MetricCard label="Vendor contacts" value={String(data.profiles.filter((profile) => profile.role === 'vendor').length)} detail="Active suppliers" tone="amber" />
        </MetricGrid>
        <div className="grid gap-4 lg:grid-cols-2">
          {data.orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{order.package_name}</p>
              <p className="mt-1 text-xs text-slate-500">{order.vendor_name}</p>
              <p className="mt-3 text-sm text-slate-600">{order.location ?? 'No destination'}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">{order.validity_date ?? 'No expiry set'}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

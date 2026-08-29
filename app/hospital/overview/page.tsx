import { Activity, ArrowRight, Network, Package, Truck } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { MetricCard, MetricGrid } from '@/components/dashboard-metrics'
import { getCurrentProfile } from '@/lib/get-current-profile'
import { getHospitalDashboardData } from '@/lib/data/dashboard'

export default async function HospitalOverviewPage() {
  const profile = await getCurrentProfile()
  const data = await getHospitalDashboardData()
  const totalInventory = data.inventory.length
  const lowInventory = data.inventory.filter((item) => item.current_quantity / Math.max(1, item.full_capacity) < 0.25).length
  const pendingRequests = data.requests.filter((request) => request.status !== 'authorized').length
  const openOrders = data.orders.filter((order) => order.status !== 'delivered').length

  return (
    <>
      <PageHeader title="Hospital Overview" subtitle="Live inventory, logistics, and network coordination" />
      <main className="flex-1 space-y-6 px-5 py-6 lg:px-8">
        <MetricGrid>
          <MetricCard label="Inventory items" value={String(totalInventory)} detail="Tracked stock lines" tone="teal" />
          <MetricCard label="Low stock items" value={String(lowInventory)} detail="Under 25% capacity" tone="amber" />
          <MetricCard label="Open network requests" value={String(pendingRequests)} detail="Awaiting authorization" tone="red" />
          <MetricCard label="Open logistics orders" value={String(openOrders)} detail="In transit or pending" tone="slate" />
        </MetricGrid>
        <section className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-teal-600" />
              <h2 className="text-sm font-semibold text-slate-800">Inventory watchlist</h2>
            </div>
            <div className="space-y-3">
              {data.inventory.slice(0, 6).map((item) => {
                const pct = Math.round((item.current_quantity / Math.max(1, item.full_capacity)) * 100)
                return (
                  <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                      <span className="text-sm font-medium text-slate-700 tabular-nums">{item.current_quantity}/{item.full_capacity} {item.unit}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white">
                      <div className="h-2 rounded-full bg-teal-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-teal-600" />
                <h2 className="text-sm font-semibold text-slate-800">Network activity</h2>
              </div>
              <p className="mt-3 text-sm text-slate-600">Signed in as <span className="font-semibold">{profile?.org_name ?? 'Hospital'}</span>.</p>
              <p className="mt-2 text-xs text-slate-500">Use Network Share to request donor support for critical shortages.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-teal-600" />
                <h2 className="text-sm font-semibold text-slate-800">Recent orders</h2>
              </div>
              <div className="mt-3 space-y-3">
                {data.orders.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{order.vendor_name}</p>
                      <p className="text-xs text-slate-500">{order.package_name}</p>
                    </div>
                    <span className="text-xs font-medium text-slate-500">{order.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Activity className="h-4 w-4" />
          <span>Dashboard data is loaded from Supabase and refreshed on each request.</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </main>
    </>
  )
}

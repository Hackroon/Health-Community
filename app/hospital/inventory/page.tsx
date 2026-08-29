import { PageHeader } from '@/components/page-header'
import { MetricCard, MetricGrid } from '@/components/dashboard-metrics'
import { getHospitalDashboardData } from '@/lib/data/dashboard'
import { percentageOf } from '@/lib/data/inventory'

export default async function HospitalInventoryPage() {
  const data = await getHospitalDashboardData()
  const items = data.inventory

  return (
    <>
      <PageHeader title="Inventory" subtitle="Manage stock levels, capacity, and supply readiness" />
      <main className="flex-1 space-y-6 px-5 py-6 lg:px-8">
        <MetricGrid>
          <MetricCard label="Tracked items" value={String(items.length)} detail="Live records in Supabase" tone="teal" />
          <MetricCard label="Critical shortages" value={String(items.filter((item) => percentageOf(item) < 19).length)} detail="Immediate review needed" tone="red" />
          <MetricCard label="Warning range" value={String(items.filter((item) => percentageOf(item) >= 19 && percentageOf(item) <= 24).length)} detail="Monitor for resupply" tone="amber" />
          <MetricCard label="Healthy items" value={String(items.filter((item) => percentageOf(item) > 24).length)} detail="Within acceptable range" tone="emerald" />
        </MetricGrid>
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item) => {
            const pct = percentageOf(item)
            return (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{Math.round(pct)}%</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-teal-500" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-3 text-sm text-slate-600">{item.current_quantity} {item.unit} available of {item.full_capacity} capacity.</p>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

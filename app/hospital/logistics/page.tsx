import { PageHeader } from '@/components/page-header'
import { getHospitalDashboardData } from '@/lib/data/dashboard'

export default async function HospitalLogisticsPage() {
  const data = await getHospitalDashboardData()

  return (
    <>
      <PageHeader title="Logistics & Order Storage" subtitle="Vendor orders, delivery tracking, and documentation" />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {data.orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{order.vendor_name}</p>
              <p className="mt-1 text-xs text-slate-500">{order.package_name}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-600">{order.location ?? 'No location'}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

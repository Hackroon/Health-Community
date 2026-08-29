import { PageHeader } from '@/components/page-header'
import { getVendorDashboardData } from '@/lib/data/dashboard'

export default async function VendorLogisticsPage() {
  const data = await getVendorDashboardData()

  return (
    <>
      <PageHeader title="Order Fulfillment" subtitle="Update status and documentation for hospital orders" />
      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {data.orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{order.package_name}</p>
              <p className="mt-1 text-xs text-slate-500">{order.vendor_name}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">{order.location ?? 'No destination'}</span>
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

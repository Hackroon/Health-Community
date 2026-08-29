import { PageHeader } from '@/components/page-header'
import { MetricCard, MetricGrid } from '@/components/dashboard-metrics'
import { getHospitalDashboardData } from '@/lib/data/dashboard'
import { percentageOf } from '@/lib/data/inventory'

export default async function HospitalVitalsPage() {
  const data = await getHospitalDashboardData()
  const rates = data.inventory.map(percentageOf)
  const avg = rates.length ? Math.round(rates.reduce((a, b) => a + b, 0) / rates.length) : 0

  return (
    <>
      <PageHeader title="Vitals" subtitle="Facility-wide capacity and utilization signals" />
      <main className="flex-1 space-y-6 px-5 py-6 lg:px-8">
        <MetricGrid>
          <MetricCard label="Average utilization" value={`${avg}%`} detail="Across tracked inventory" tone="teal" />
          <MetricCard label="Critical resources" value={String(rates.filter((rate) => rate < 19).length)} detail="Below emergency threshold" tone="red" />
          <MetricCard label="Alert resources" value={String(rates.filter((rate) => rate >= 19 && rate <= 24).length)} detail="Trigger share review" tone="amber" />
          <MetricCard label="Stable resources" value={String(rates.filter((rate) => rate > 24).length)} detail="Within expected range" tone="emerald" />
        </MetricGrid>
      </main>
    </>
  )
}

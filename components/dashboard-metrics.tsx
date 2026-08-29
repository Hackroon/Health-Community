'use client'

import { cn } from '@/lib/utils'

export function MetricGrid({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{children}</div>
}

export function MetricCard({
  label,
  value,
  detail,
  tone = 'slate',
}: {
  label: string
  value: string
  detail: string
  tone?: 'slate' | 'emerald' | 'amber' | 'red' | 'teal'
}) {
  const tones = {
    slate: 'border-slate-200 bg-white text-slate-900',
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    amber: 'border-amber-200 bg-amber-50 text-amber-900',
    red: 'border-red-200 bg-red-50 text-red-900',
    teal: 'border-teal-200 bg-teal-50 text-teal-900',
  }

  return (
    <div className={cn('rounded-2xl border p-4 shadow-sm', tones[tone])}>
      <p className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs opacity-75">{detail}</p>
    </div>
  )
}

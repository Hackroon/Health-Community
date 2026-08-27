"use client"

import { useState } from "react"
import {
  Activity,
  LayoutDashboard,
  Boxes,
  Share2,
  Truck,
  Settings,
  HeartPulse,
} from "lucide-react"

const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Inventory", icon: Boxes },
  { label: "Network Share", icon: Share2 },
  { label: "Logistics", icon: Truck },
  { label: "Vitals", icon: Activity },
  { label: "Settings", icon: Settings },
]

export function Sidebar() {
  const [active, setActive] = useState("Overview")

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white/80 px-4 py-6 backdrop-blur lg:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
          <HeartPulse className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-bold leading-tight text-slate-800">
            PHC MedGrid
          </p>
          <p className="text-xs text-slate-400">Resource Optimizer</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {nav.map(({ label, icon: Icon }) => {
          const isActive = active === label
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActive(label)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden />
              {label}
            </button>
          )
        })}
      </nav>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold text-slate-700">Hospital Alpha</p>
        <p className="mt-0.5 text-xs text-slate-400">
          Coverage node · Region 7
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-500">Live sync active</span>
        </div>
      </div>
    </aside>
  )
}

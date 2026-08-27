"use client"

import { useState } from "react"
import { Pill, BedDouble, Droplets, Bell, Search } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { ResourceCard } from "@/components/resource-card"
import { AlertContainer } from "@/components/alert-container"
import { LogisticsSheet } from "@/components/logistics-sheet"

const SAFE_THRESHOLD = 25

export default function Page() {
  const [tablets, setTablets] = useState(62)
  const [beds, setBeds] = useState(21)
  const [supplies, setSupplies] = useState(14)

  const resources = [
    { key: "Tablets", value: tablets },
    { key: "Injection Beds", value: beds },
    { key: "Glucose / Blood / Bandages", value: supplies },
  ]

  const shortages = resources.filter((r) => r.value < SAFE_THRESHOLD)
  const alertActive = shortages.length > 0

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* header */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur lg:px-8">
          <div>
            <h1 className="text-lg font-bold text-slate-900 text-balance">
              Resource Optimization Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Primary Health Centre logistics network · real-time tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search resources..."
                className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {alertActive && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 space-y-6 px-5 py-6 lg:px-8">
          {/* 1. top stats cards */}
          <section aria-label="Real-time resource tracking">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              <ResourceCard
                title="Tablets Inventory"
                subtitle="Oral medication stock"
                value={tablets}
                icon={Pill}
                onChange={setTablets}
              />
              <ResourceCard
                title="Injection Beds Availability"
                subtitle="Treatment capacity"
                value={beds}
                icon={BedDouble}
                onChange={setBeds}
              />
              <ResourceCard
                title="Glucose / Blood / Bandages"
                subtitle="Critical fluids & consumables"
                value={supplies}
                icon={Droplets}
                onChange={setSupplies}
              />
            </div>
          </section>

          {/* 2. middle alert container */}
          <section aria-label="Cross-network resource request">
            <AlertContainer
              active={alertActive}
              shortageLabels={shortages.map((s) => s.key)}
            />
          </section>

          {/* 3. bottom logistics sheet */}
          <section aria-label="Logistics and order storage">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Logistics &amp; Order Storage
            </h2>
            <LogisticsSheet />
          </section>
        </main>
      </div>
    </div>
  )
}

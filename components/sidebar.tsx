'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Activity,
  LayoutDashboard,
  Boxes,
  Share2,
  Truck,
  Settings,
  HeartPulse,
  Building2,
  LogOut,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const hospitalNav: NavItem[] = [
  { label: 'Overview', href: '/hospital/overview', icon: LayoutDashboard },
  { label: 'Inventory', href: '/hospital/inventory', icon: Boxes },
  { label: 'Network Share', href: '/hospital/network', icon: Share2 },
  { label: 'Logistics', href: '/hospital/logistics', icon: Truck },
  { label: 'Vitals', href: '/hospital/vitals', icon: Activity },
  { label: 'Settings', href: '/hospital/settings', icon: Settings },
]

const vendorNav: NavItem[] = [
  { label: 'Overview', href: '/vendor/overview', icon: LayoutDashboard },
  { label: 'Logistics', href: '/vendor/logistics', icon: Truck },
  { label: 'Settings', href: '/vendor/settings', icon: Settings },
]

interface SidebarProps {
  role: 'hospital' | 'vendor'
  orgName: string
  location?: string | null
}

export function Sidebar({ role, orgName, location }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const nav = role === 'vendor' ? vendorNav : hospitalNav
  const RoleIcon = role === 'vendor' ? Building2 : HeartPulse
  const rootHref = role === 'vendor' ? '/vendor/overview' : '/hospital/overview'

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white/80 px-4 py-6 backdrop-blur lg:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
          <RoleIcon className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-bold leading-tight text-slate-800">PHC MedGrid</p>
          <p className="text-xs text-slate-400">
            {role === 'vendor' ? 'Vendor Portal' : 'Resource Optimizer'}
          </p>
        </div>
      </div>

      <Link href={rootHref} className="mb-3 block px-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Dashboard</p>
          <p className="text-sm font-semibold text-slate-800">{role === 'vendor' ? 'Vendor Overview' : 'Hospital Overview'}</p>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {nav.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="truncate text-xs font-semibold text-slate-700">{orgName}</p>
        <p className="mt-0.5 truncate text-xs text-slate-400">
          {location || (role === 'vendor' ? 'Supplier network' : 'Coverage node')}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-500">Live sync active</span>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-white hover:text-red-600"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden />
          Sign out
        </button>
      </div>
    </aside>
  )
}

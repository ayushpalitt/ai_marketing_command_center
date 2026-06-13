"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Megaphone, LineChart, Cpu, SearchCode, FileText, Database, Settings, GitFork, Activity, PieChart, ShieldAlert, LayoutTemplate } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Custom Dashboards", href: "/custom-dashboards", icon: LayoutTemplate },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Traffic", href: "/traffic", icon: LineChart },
  { name: "Segmentation", href: "/segmentation", icon: PieChart },
  { name: "Funnel Analytics", href: "/funnel", icon: GitFork },
  { name: "SQL Analytics Lab", href: "/sql-lab", icon: Database },
  { name: "AI Insights", href: "/insights", icon: Cpu },
  { name: "Forecasting", href: "/forecasting", icon: SearchCode },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Health Center", href: "/health", icon: Activity },
  { name: "Data Quality", href: "/data-quality", icon: ShieldAlert },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-white/10 bg-[#0F172A] glassmorphism">
      <div className="flex h-16 items-center px-6">
        <Cpu className="mr-3 h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-tight text-white">AI Command Center</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-white"
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center rounded-lg bg-white/5 p-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">AI</span>
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium text-white">System Status</p>
            <p className="text-[10px] text-green-400">All modules online</p>
          </div>
        </div>
      </div>
    </div>
  )
}

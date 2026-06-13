"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Megaphone, LineChart, Cpu, SearchCode, FileText, Database, Settings, GitFork, Activity, PieChart, ShieldAlert, BarChart3 } from "lucide-react"

const BrandLogo = () => (
  <div className="mr-3 shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-sm border border-blue-500/20">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  </div>
)

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Traffic", href: "/traffic", icon: LineChart },
  { name: "Segmentation", href: "/segmentation", icon: PieChart },
  { name: "Funnel Analytics", href: "/funnel", icon: GitFork },
  { name: "SQL Analytics Lab", href: "/sql-lab", icon: Database },
  { name: "Power BI Reports", href: "/powerbi", icon: BarChart3 },
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
    <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center px-6 border-b border-slate-100">
        <BrandLogo />
        <span className="text-xl font-extrabold tracking-tight text-slate-900">Nexus<span className="text-blue-600 font-medium">Analytics</span></span>
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
                  ? "bg-slate-100 text-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center rounded-lg bg-slate-50 p-3 border border-slate-100">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">AI</span>
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium text-slate-900">System Status</p>
            <p className="text-[10px] text-green-400">All modules online</p>
          </div>
        </div>
      </div>
    </div>
  )
}

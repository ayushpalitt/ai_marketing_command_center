"use client"
import { LayoutTemplate, Plus, MoreVertical, LayoutDashboard, LineChart, Megaphone, Users, Search } from "lucide-react"
import { useRouter } from "next/navigation"

const customDashboards = [
  { id: 1, name: "Executive Summary", description: "High-level KPI overview for C-suite reporting.", icon: LayoutDashboard, color: "text-indigo-400", bg: "bg-indigo-500/10", widgets: 8, lastEdited: "2 hours ago" },
  { id: 2, name: "SEO & Content Performance", description: "Organic traffic analysis and landing page metrics.", icon: Search, color: "text-emerald-400", bg: "bg-emerald-500/10", widgets: 12, lastEdited: "1 day ago" },
  { id: 3, name: "Paid Acquisition (Q3)", description: "ROAS tracking for Meta and Google Ads campaigns.", icon: Megaphone, color: "text-blue-400", bg: "bg-blue-500/10", widgets: 6, lastEdited: "3 days ago" },
  { id: 4, name: "User Journey & Funnel", description: "Drop-off analysis across the core product funnel.", icon: Users, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", widgets: 4, lastEdited: "1 week ago" },
  { id: 5, name: "Traffic Anomalies Tracker", description: "Real-time monitor for bot traffic and spikes.", icon: LineChart, color: "text-rose-400", bg: "bg-rose-500/10", widgets: 5, lastEdited: "2 weeks ago" },
]

export default function CustomDashboardsPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutTemplate className="h-8 w-8 text-primary" /> Saved Dashboards
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage, build, and share your custom analytics views.</p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button 
            className="flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            onClick={() => router.push('/dashboard')}
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Dashboard
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customDashboards.map((dashboard) => (
          <div 
            key={dashboard.id} 
            onClick={() => router.push('/dashboard')}
            className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:border-primary/50 transition-colors relative overflow-hidden flex flex-col h-full cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${dashboard.bg}`}>
                <dashboard.icon className={`h-6 w-6 ${dashboard.color}`} />
              </div>
              <button className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{dashboard.name}</h3>
              <p className="mt-2 text-sm text-slate-400 line-clamp-2">{dashboard.description}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center">
                <LayoutDashboard className="h-3 w-3 mr-1" /> {dashboard.widgets} widgets
              </span>
              <span>Edited {dashboard.lastEdited}</span>
            </div>

            {/* Decorative background blur on hover */}
            <div className={`absolute -right-8 -bottom-8 h-32 w-32 rounded-full ${dashboard.bg} blur-3xl opacity-0 group-hover:opacity-50 transition-opacity`}></div>
          </div>
        ))}

        {/* Empty State / Create New Card */}
        <div 
          onClick={() => router.push('/dashboard')}
          className="rounded-xl border border-dashed border-white/20 bg-transparent p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-colors min-h-[200px]"
        >
          <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-3 text-slate-400">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-white">Blank Canvas</h3>
          <p className="mt-1 text-sm text-slate-400">Start from scratch with the drag-and-drop builder.</p>
        </div>
      </div>
    </div>
  )
}

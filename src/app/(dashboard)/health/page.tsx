"use client"
import { Activity, ArrowUpRight, ArrowDownRight, ShieldCheck, ShieldAlert, Sparkles } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const healthData = [
  { name: "Score", value: 84 },
  { name: "Gap", value: 16 }
]

export default function HealthCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketing Health Center</h1>
        <p className="text-sm text-slate-400 mt-1">Overall platform vitals and anomaly detection.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Score Gauge */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:col-span-1 flex flex-col items-center justify-center relative overflow-hidden group">
          <h3 className="text-lg font-medium w-full text-left mb-2">Overall Health</h3>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell key="cell-0" fill="#22C55E" />
                  <Cell key="cell-1" fill="rgba(255,255,255,0.1)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 pointer-events-none">
              <span className="text-5xl font-extrabold text-white">84</span>
              <span className="text-sm font-medium text-green-400">Excellent</span>
            </div>
          </div>
          <div className="absolute -bottom-10 h-32 w-32 rounded-full bg-green-500/20 blur-3xl group-hover:bg-green-500/30 transition-all"></div>
        </div>

        {/* AI Health Explanation */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium text-white">AI Diagnosis</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              Your marketing health score is <span className="font-bold text-green-400">84 (Excellent)</span>, up 3 points from last week. This improvement is primarily driven by a <span className="font-medium text-white">12% increase in ROAS</span> on Paid Social campaigns and a stabilized bounce rate on the pricing page. 
              <br /><br />
              However, the score is held back by the <span className="font-medium text-red-400">recent spike in CPA</span> on LinkedIn B2B campaigns. Addressing this anomaly will likely push the score above 90.
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="rounded-md bg-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/30 transition-colors">
              View Anomaly Report
            </button>
            <button className="rounded-md bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              Recalculate
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">System Alerts</h2>
      <div className="grid gap-4">
        <AlertCard 
          icon={ShieldAlert}
          title="Conversion Drop Detected"
          description="The 'Summer Promo Search' campaign saw a 45% drop in conversions over the last 12 hours despite consistent spend."
          type="critical"
          time="2 hours ago"
        />
        <AlertCard 
          icon={ShieldCheck}
          title="Traffic Anomaly Resolved"
          description="The bot traffic spike detected on the /blog endpoint has been automatically filtered from analytics."
          type="success"
          time="5 hours ago"
        />
      </div>
    </div>
  )
}

function AlertCard({ icon: Icon, title, description, type, time }: any) {
  const isCritical = type === 'critical'
  return (
    <div className={`rounded-xl border p-4 backdrop-blur-md flex items-start gap-4 ${
      isCritical ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/10'
    }`}>
      <div className={`mt-1 p-2 rounded-lg ${isCritical ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-white">{title}</h4>
          <span className="text-xs text-slate-500">{time}</span>
        </div>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
        {isCritical && (
          <button className="mt-3 text-xs font-medium text-red-400 hover:text-red-300 transition-colors">
            Take Action &rarr;
          </button>
        )}
      </div>
    </div>
  )
}

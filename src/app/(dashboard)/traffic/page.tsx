"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Globe, Users, Clock, AlertCircle } from "lucide-react"

const trafficSourceData = [
  { name: "Organic Search", value: 45000, color: "#6366F1" },
  { name: "Direct", value: 25000, color: "#8B5CF6" },
  { name: "Paid Social", value: 15000, color: "#06B6D4" },
  { name: "Referral", value: 10000, color: "#10B981" },
  { name: "Email", value: 5000, color: "#F59E0B" },
]

const landingPageData = [
  { path: "/", sessions: 45200, bounceRate: "42%", time: "1:24" },
  { path: "/pricing", sessions: 28100, bounceRate: "58%", time: "2:15" },
  { path: "/features", sessions: 15400, bounceRate: "35%", time: "3:05" },
  { path: "/blog/marketing-tips", sessions: 8900, bounceRate: "75%", time: "4:30", alert: true },
  { path: "/contact", sessions: 2400, bounceRate: "25%", time: "0:45" },
]

export default function TrafficPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Traffic Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Analyze your audience sources and landing page performance.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Traffic Sources Pie Chart */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md xl:col-span-1">
          <h3 className="text-lg font-medium mb-6">Traffic Sources</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: "#0F172A", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">100k</span>
              <span className="text-xs text-slate-400">Sessions</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {trafficSourceData.map(source => (
              <div key={source.name} className="flex items-center">
                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: source.color }}></div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">{source.name}</span>
                  <span className="text-sm font-semibold text-white">{(source.value / 1000).toFixed(1)}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Landing Page Performance */}
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md xl:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Landing Page Analysis</h3>
            <button className="text-sm text-primary hover:underline">View all pages</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/5 text-xs uppercase text-slate-400 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Page URL</th>
                  <th className="px-6 py-4 font-medium">Sessions</th>
                  <th className="px-6 py-4 font-medium">Bounce Rate</th>
                  <th className="px-6 py-4 font-medium">Avg Time</th>
                  <th className="px-6 py-4 font-medium">Insights</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {landingPageData.map((page, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-slate-500" /> {page.path}
                    </td>
                    <td className="px-6 py-4">{(page.sessions / 1000).toFixed(1)}k</td>
                    <td className="px-6 py-4">
                      <span className={parseInt(page.bounceRate) > 70 ? "text-red-400 font-bold" : ""}>
                        {page.bounceRate}
                      </span>
                    </td>
                    <td className="px-6 py-4">{page.time}</td>
                    <td className="px-6 py-4">
                      {page.alert ? (
                        <div className="flex items-center text-xs text-red-400 font-medium bg-red-500/10 px-2 py-1 rounded-full w-fit">
                          <AlertCircle className="mr-1 h-3 w-3" /> High Bounce
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, Users, MousePointerClick, DollarSign, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const mockChartData = [
  { name: "Mon", revenue: 4000, traffic: 2400 },
  { name: "Tue", revenue: 3000, traffic: 1398 },
  { name: "Wed", revenue: 2000, traffic: 9800 },
  { name: "Thu", revenue: 2780, traffic: 3908 },
  { name: "Fri", revenue: 1890, traffic: 4800 },
  { name: "Sat", revenue: 2390, traffic: 3800 },
  { name: "Sun", revenue: 3490, traffic: 4300 },
]

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("7D")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Main Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Operational view of your marketing performance.</p>
        </div>
        <div className="mt-4 flex space-x-2 sm:mt-0">
          {["7D", "30D", "90D", "YTD"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                dateRange === range
                  ? "bg-primary text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Sessions" value="124,592" change="+12.5%" isPositive={true} icon={Users} />
        <KPICard title="Conversion Rate" value="3.42%" change="+0.8%" isPositive={true} icon={Target} />
        <KPICard title="Total Revenue" value="$45,231.89" change="-2.4%" isPositive={false} icon={DollarSign} />
        <KPICard title="Avg. CTR" value="4.12%" change="+1.1%" isPositive={true} icon={MousePointerClick} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h3 className="text-lg font-medium mb-6">Revenue Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F172A", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h3 className="text-lg font-medium mb-6">Traffic Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F172A", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="traffic" stroke="#06B6D4" strokeWidth={2} dot={{ r: 4, fill: "#0F172A", strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value, change, isPositive, icon: Icon }: any) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md relative overflow-hidden group hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`flex items-center font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
          {change}
        </span>
        <span className="ml-2 text-slate-500">vs last period</span>
      </div>
      {/* Decorative gradient blur */}
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all"></div>
    </div>
  )
}

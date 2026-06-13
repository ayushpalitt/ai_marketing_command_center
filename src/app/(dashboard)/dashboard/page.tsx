"use client"
import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownRight, Users, MousePointerClick, DollarSign, Target, Loader2 } from "lucide-react"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { getDashboardMetrics } from "@/actions/dashboard"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("7D")
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>({ kpis: {}, chartData: [] })

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getDashboardMetrics(dateRange).then((res) => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });
    return () => { isMounted = false };
  }, [dateRange]);

  const { kpis, chartData } = data;

  // Formatting helpers
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
  const formatNumber = (val: number) => new Intl.NumberFormat('en-US').format(val || 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            Main Dashboard
            {loading && <Loader2 className="h-5 w-5 animate-spin text-slate-400" />}
          </h1>
          <p className="text-sm text-slate-500 mt-1">Operational view of your marketing performance.</p>
        </div>
        <div className="mt-4 flex space-x-2 sm:mt-0">
          {["7D", "30D", "90D", "YTD"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                dateRange === range
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Sessions" value={formatNumber(kpis.totalSessions)} change="+12.5%" isPositive={true} icon={Users} loading={loading} />
        <KPICard title="Conversion Rate" value={`${kpis.conversionRate}%`} change="+0.8%" isPositive={true} icon={Target} loading={loading} />
        <KPICard title="Total Revenue" value={formatCurrency(kpis.totalRevenue)} change="-2.4%" isPositive={false} icon={DollarSign} loading={loading} />
        <KPICard title="Avg. CTR" value={`${kpis.avgCtr}%`} change="+1.1%" isPositive={true} icon={MousePointerClick} loading={loading} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h3 className="text-lg font-medium mb-6 text-slate-900">Revenue Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ color: "#0f172a" }}
                  formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h3 className="text-lg font-medium mb-6 text-slate-900">Traffic Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatNumber} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ color: "#0f172a" }}
                  formatter={(value: number) => [formatNumber(value), "Sessions"]}
                />
                <Line type="monotone" dataKey="traffic" stroke="#0ea5e9" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value, change, isPositive, icon: Icon, loading }: any) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 relative overflow-hidden group hover:border-blue-600/50 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          {loading ? (
             <div className="h-9 w-24 bg-slate-100 rounded animate-pulse mt-2"></div>
          ) : (
             <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`flex items-center font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
          {isPositive ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
          {change}
        </span>
        <span className="ml-2 text-slate-500">vs last period</span>
      </div>
      {/* Decorative background circle */}
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-slate-50 group-hover:bg-blue-50/50 transition-all"></div>
    </div>
  )
}

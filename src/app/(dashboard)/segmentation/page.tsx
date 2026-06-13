"use client"
import { useState } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { PieChart as PieChartIcon, Target, Users, Map, Smartphone, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react"

const deviceData = [
  { name: 'Mobile', value: 58000, color: '#0EA5E9' },
  { name: 'Desktop', value: 32000, color: '#6366F1' },
  { name: 'Tablet', value: 10000, color: '#8B5CF6' },
]

const geoData = [
  { name: 'United States', sessions: 45000, conversion: 4.2 },
  { name: 'United Kingdom', sessions: 18000, conversion: 3.8 },
  { name: 'Canada', sessions: 12000, conversion: 3.5 },
  { name: 'Australia', sessions: 8500, conversion: 4.5 },
  { name: 'Germany', sessions: 6000, conversion: 2.9 },
]

export default function SegmentationPage() {
  const [activeSegment, setActiveSegment] = useState("device")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <PieChartIcon className="h-8 w-8 text-primary" /> Segmentation Engine
          </h1>
          <p className="text-sm text-slate-500 mt-1">Slice and dice your marketing data across all dimensions.</p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <div className="flex bg-white shadow-sm rounded-md p-1 border border-slate-200">
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${activeSegment === 'device' ? 'bg-primary text-slate-900 shadow' : 'text-slate-500 hover:text-slate-900'}`}
              onClick={() => setActiveSegment('device')}
            >
              Device
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${activeSegment === 'geo' ? 'bg-primary text-slate-900 shadow' : 'text-slate-500 hover:text-slate-900'}`}
              onClick={() => setActiveSegment('geo')}
            >
              Geography
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${activeSegment === 'channel' ? 'bg-primary text-slate-900 shadow' : 'text-slate-500 hover:text-slate-900'}`}
              onClick={() => setActiveSegment('channel')}
            >
              Channel
            </button>
          </div>
          <button className="flex items-center rounded-md border border-slate-200 bg-white shadow-sm px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <Filter className="mr-2 h-4 w-4" /> Add Filter
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Visual Charts */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm p-6 ">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">{activeSegment === 'device' ? 'Sessions by Device Category' : 'Sessions by Country'}</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeSegment === 'device' ? (
                <PieChart>
                  <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px" }} itemStyle={{ color: "#0f172a" }}/>
                  <Pie data={deviceData} innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value">
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              ) : (
                <BarChart data={geoData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px" }} itemStyle={{ color: "#0f172a" }} cursor={{fill: 'rgba(255,255,255,0.05)'}}/>
                  <Bar dataKey="sessions" fill="#6366F1" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segment AI Callouts */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-green-500/10 to-transparent p-5 ">
            <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1 text-emerald-600" /> High-Performing Segment
            </h4>
            <p className="text-sm text-slate-300">
              Users from <span className="font-semibold text-slate-900">Australia</span> have the highest conversion rate (4.5%) across all regions. We recommend increasing local Google Ads spend by 20%.
            </p>
          </div>
          
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-red-500/10 to-transparent p-5 ">
            <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
              <ArrowDownRight className="h-4 w-4 mr-1 text-rose-600" /> Underperforming Segment
            </h4>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-slate-900">Mobile</span> traffic constitutes 58% of all sessions but only 32% of total revenue. Mobile bounce rate is critically high at 68%.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 ">
            <h4 className="text-sm font-semibold text-slate-500 mb-4">Segment Distribution</h4>
            <div className="space-y-3">
              {deviceData.map((d) => (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-900 font-medium">{d.name}</span>
                    <span className="text-slate-500">{d.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${(d.value / 100000) * 100}%`, backgroundColor: d.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

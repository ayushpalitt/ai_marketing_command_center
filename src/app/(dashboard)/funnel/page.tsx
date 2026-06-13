"use client"
import { useState } from "react"
import { ResponsiveContainer, FunnelChart, Funnel, LabelList, Tooltip } from "recharts"
import { GitFork, Sparkles, ArrowRight, MousePointerClick, UserPlus, FileText, BadgeDollarSign } from "lucide-react"

const funnelData = [
  { value: 100000, name: 'Awareness', fill: '#6366F1' },
  { value: 45000, name: 'Visit', fill: '#8B5CF6' },
  { value: 15000, name: 'Signup', fill: '#D946EF' },
  { value: 8000, name: 'Lead', fill: '#F43F5E' },
  { value: 2400, name: 'Customer', fill: '#F59E0B' }
];

export default function FunnelAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <GitFork className="h-8 w-8 text-primary" /> Funnel Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">Visualize your customer journey from awareness to conversion.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Funnel Chart */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm p-6 ">
          <h3 className="text-lg font-medium mb-6">Aggregate Conversion Funnel</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px" }}
                  itemStyle={{ color: "#0f172a" }}
                />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList position="right" fill="#fff" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6  flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium text-slate-900">AI Optimization Insights</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-xs font-bold uppercase text-rose-600 mb-1">Critical Drop-off</p>
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-slate-900">Awareness → Visit</span> has a massive 55% drop-off rate. Your ad copy is likely driving impressions but failing to generate clicks.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-xs font-bold uppercase text-yellow-400 mb-1">Friction Point</p>
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-slate-900">Signup → Lead</span> drops 46%. Users are abandoning the onboarding flow. Consider simplifying the lead qualification form.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-xs font-bold uppercase text-emerald-600 mb-1">High Performer</p>
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-slate-900">Lead → Customer</span> converts at an impressive 30%. Your sales team is closing effectively once a lead is qualified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm  overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-semibold text-lg">Stage Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white shadow-sm text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Stage</th>
                <th className="px-6 py-4 font-medium">Volume</th>
                <th className="px-6 py-4 font-medium">Conversion from Prev</th>
                <th className="px-6 py-4 font-medium">Drop-off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white shadow-sm transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2"><MousePointerClick className="h-4 w-4 text-indigo-400"/> Awareness</td>
                <td className="px-6 py-4">100,000</td>
                <td className="px-6 py-4 text-slate-500">-</td>
                <td className="px-6 py-4 text-slate-500">-</td>
              </tr>
              <tr className="hover:bg-white shadow-sm transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2"><UserPlus className="h-4 w-4 text-violet-400"/> Visit</td>
                <td className="px-6 py-4">45,000</td>
                <td className="px-6 py-4 text-emerald-600 font-medium">45.0%</td>
                <td className="px-6 py-4 text-rose-600 font-medium">55.0%</td>
              </tr>
              <tr className="hover:bg-white shadow-sm transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2"><FileText className="h-4 w-4 text-fuchsia-400"/> Signup</td>
                <td className="px-6 py-4">15,000</td>
                <td className="px-6 py-4 text-emerald-600 font-medium">33.3%</td>
                <td className="px-6 py-4 text-rose-600 font-medium">66.7%</td>
              </tr>
              <tr className="hover:bg-white shadow-sm transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2"><Activity className="h-4 w-4 text-rose-400"/> Lead</td>
                <td className="px-6 py-4">8,000</td>
                <td className="px-6 py-4 text-emerald-600 font-medium">53.3%</td>
                <td className="px-6 py-4 text-rose-600 font-medium">46.7%</td>
              </tr>
              <tr className="hover:bg-white shadow-sm transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2"><BadgeDollarSign className="h-4 w-4 text-amber-400"/> Customer</td>
                <td className="px-6 py-4">2,400</td>
                <td className="px-6 py-4 text-emerald-600 font-medium">30.0%</td>
                <td className="px-6 py-4 text-rose-600 font-medium">70.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

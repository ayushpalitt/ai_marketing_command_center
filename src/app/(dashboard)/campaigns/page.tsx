"use client"
import { useState } from "react"
import { Search, Filter, TrendingUp, TrendingDown, Megaphone, ArrowUpRight } from "lucide-react"

const mockCampaigns = [
  { id: 1, name: "Q3 Meta Ads Display 142", channel: "Meta Ads", status: "Active", spend: "$45,230", revenue: "$0", roas: "0.0x", ctr: "1.2%", cpa: "$0" },
  { id: 2, name: "Summer Promo Search", channel: "Google Ads", status: "Active", spend: "$12,400", revenue: "$48,900", roas: "3.9x", ctr: "5.4%", cpa: "$24" },
  { id: 3, name: "Retargeting Cart Abandoners", channel: "Meta Ads", status: "Active", spend: "$3,200", revenue: "$24,500", roas: "7.6x", ctr: "8.1%", cpa: "$12" },
  { id: 4, name: "B2B SaaS Lead Gen LinkedIn", channel: "LinkedIn Ads", status: "Paused", spend: "$8,900", revenue: "$32,000", roas: "3.6x", ctr: "2.1%", cpa: "$145" },
  { id: 5, name: "Brand Awareness TikTok", channel: "TikTok Ads", status: "Active", spend: "$15,000", revenue: "$18,000", roas: "1.2x", ctr: "0.9%", cpa: "$85" },
]

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Advanced campaign analysis and ROI tracking.</p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="rounded-md border border-slate-200 bg-white shadow-sm py-2 pl-9 pr-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center rounded-md border border-slate-200 bg-white shadow-sm px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6  bg-gradient-to-br from-green-500/10 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-900">Top Performer</h3>
          </div>
          <p className="text-sm text-slate-500">Retargeting Cart Abandoners</p>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-500">ROAS</p>
              <p className="text-2xl font-bold text-emerald-600">7.6x</p>
            </div>
            <button className="text-xs text-primary hover:underline">View insights</button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6  bg-gradient-to-br from-red-500/10 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="h-5 w-5 text-rose-600" />
            <h3 className="font-semibold text-slate-900">Critical Anomaly</h3>
          </div>
          <p className="text-sm text-slate-500">Q3 Meta Ads Display 142</p>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-500">Spend vs Conversions</p>
              <p className="text-2xl font-bold text-rose-600">$45.2k / 0</p>
            </div>
            <button className="text-xs text-rose-600 hover:underline">Investigate</button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6  relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">AI</span>
            </div>
            <h3 className="font-semibold text-slate-900">AI Recommendation</h3>
          </div>
          <p className="text-sm text-slate-300 mt-2">
            Shift $5,000 budget from <span className="font-medium text-slate-900">Brand Awareness TikTok</span> to <span className="font-medium text-slate-900">Summer Promo Search</span> to increase projected revenue by $12,400.
          </p>
          <button className="mt-3 flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors">
            Apply optimization <ArrowUpRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm  overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-semibold text-lg">Campaign Leaderboard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white shadow-sm text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Spend</th>
                <th className="px-6 py-4 font-medium">Revenue</th>
                <th className="px-6 py-4 font-medium">ROAS</th>
                <th className="px-6 py-4 font-medium">CTR</th>
                <th className="px-6 py-4 font-medium">CPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockCampaigns.map((c) => (
                <tr key={c.id} className="hover:bg-white shadow-sm transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center mr-3">
                        <Megaphone className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{c.name}</div>
                        <div className="text-xs text-slate-500">{c.channel}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      c.status === 'Active' ? 'bg-green-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-500'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{c.spend}</td>
                  <td className="px-6 py-4 font-medium">{c.revenue}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${
                      parseFloat(c.roas) > 3 ? 'text-emerald-600' : parseFloat(c.roas) < 1.5 ? 'text-rose-600' : 'text-yellow-400'
                    }`}>
                      {c.roas}
                    </span>
                  </td>
                  <td className="px-6 py-4">{c.ctr}</td>
                  <td className="px-6 py-4">{c.cpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

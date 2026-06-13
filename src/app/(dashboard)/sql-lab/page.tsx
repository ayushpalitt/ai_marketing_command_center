"use client"
import { useState } from "react"
import { Database, Play, Save, History, Terminal, ChevronRight } from "lucide-react"
import { trackEvent } from "@/lib/tracking"

const prebuiltQueries = [
  { name: "High ROAS Campaigns", query: "SELECT campaign_name, spend, revenue, (revenue/spend) as roas FROM campaigns WHERE status = 'Active' AND (revenue/spend) > 3.0 ORDER BY roas DESC LIMIT 10;" },
  { name: "Traffic Source Conversion", query: "SELECT source, SUM(sessions) as total_sessions, SUM(conversions) as total_conversions, (SUM(conversions)/SUM(sessions))*100 as cvr FROM traffic_data GROUP BY source ORDER BY cvr DESC;" },
  { name: "Daily Revenue Trend", query: "SELECT DATE_TRUNC('day', created_at) as date, SUM(revenue) as daily_revenue FROM campaigns GROUP BY date ORDER BY date DESC LIMIT 30;" },
]

export default function SQLLabPage() {
  const [query, setQuery] = useState(prebuiltQueries[0].query)
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleRunQuery = () => {
    trackEvent('sql_query_run', { template_name: prebuiltQueries.find(q => q.query === query)?.name || 'Custom Query' })
    setIsRunning(true)
    // Simulate query execution delay
    setTimeout(() => {
      setResults([
        { campaign_name: "Retargeting Cart Abandoners", spend: "$3,200", revenue: "$24,500", roas: "7.66" },
        { name: "Summer Promo Search", spend: "$12,400", revenue: "$48,900", roas: "3.94" },
        { name: "B2B SaaS Lead Gen LinkedIn", spend: "$8,900", revenue: "$32,000", roas: "3.59" },
      ])
      setIsRunning(false)
    }, 800)
  }

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-120px)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Database className="h-8 w-8 text-primary" /> SQL Analytics Lab
          </h1>
          <p className="text-sm text-slate-400 mt-1">Directly query your 100,000+ marketing data points.</p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button className="flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <History className="mr-2 h-4 w-4" /> History
          </button>
          <button className="flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <Save className="mr-2 h-4 w-4" /> Save Template
          </button>
          <button 
            onClick={handleRunQuery}
            disabled={isRunning}
            className="flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Play className={`mr-2 h-4 w-4 ${isRunning ? 'animate-pulse' : ''}`} /> 
            {isRunning ? 'Running...' : 'Run Query'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4 flex-1 min-h-0">
        {/* Templates Sidebar */}
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/10 bg-[#0F172A]/50">
            <h3 className="font-semibold text-sm text-slate-300">Prebuilt Templates</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {prebuiltQueries.map((t, idx) => (
              <button 
                key={idx}
                onClick={() => setQuery(t.query)}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between group"
              >
                {t.name}
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Editor & Results Area */}
        <div className="lg:col-span-3 flex flex-col gap-6 min-h-0">
          {/* Query Editor */}
          <div className="rounded-xl border border-white/10 bg-[#0A0F1C] overflow-hidden flex flex-col h-[250px] flex-shrink-0 relative">
            <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4">
              <Terminal className="h-4 w-4 text-slate-500 mr-2" />
              <span className="text-xs font-mono text-slate-400">PostgreSQL (Read-Only)</span>
            </div>
            <textarea
              className="flex-1 w-full bg-transparent text-green-400 font-mono text-sm p-4 pt-12 focus:outline-none resize-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              spellCheck="false"
            />
          </div>

          {/* Results Table */}
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0F172A]/50">
              <h3 className="font-semibold text-sm">Query Results</h3>
              {results && <span className="text-xs text-slate-400">{results.length} rows returned in 800ms</span>}
            </div>
            <div className="flex-1 overflow-auto p-0">
              {!results ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <Database className="h-8 w-8 mb-2 opacity-20" />
                  <p className="text-sm">Run a query to see results</p>
                </div>
              ) : (
                <table className="w-full text-left text-sm text-slate-300 whitespace-nowrap">
                  <thead className="bg-white/5 text-xs uppercase text-slate-400 border-b border-white/10 sticky top-0">
                    <tr>
                      {Object.keys(results[0]).map(key => (
                        <th key={key} className="px-6 py-3 font-medium">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {results.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        {Object.values(row).map((val: any, j: number) => (
                          <td key={j} className="px-6 py-3 font-mono text-xs">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

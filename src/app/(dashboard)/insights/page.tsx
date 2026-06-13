"use client"
import { useState } from "react"
import { Cpu, Lightbulb, Zap, Send, BrainCircuit, Search, ArrowRight } from "lucide-react"
import { trackEvent } from "@/lib/tracking"

export default function InsightsPage() {
  const [query, setQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Cpu className="h-8 w-8 text-primary" /> AI Insights Engine
          </h1>
          <p className="text-sm text-slate-500 mt-1">Deep learning analysis of your marketing ecosystem.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Interface */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm  flex flex-col h-[600px] overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-white shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Marketing Assistant</h3>
                <p className="text-xs text-emerald-600">Online & analyzing real-time data</p>
              </div>
            </div>
            <button className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Clear history</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            {/* System greeting */}
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <BrainCircuit className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-white/10 p-4 border border-slate-200 max-w-[85%]">
                <p className="text-sm text-slate-900">
                  Hello! I've analyzed your 100,000+ data points across 24 months. I noticed your ROAS dipped slightly last week. 
                  <br /><br />
                  Would you like me to run a Root Cause Analysis, or do you have a specific question?
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="text-xs bg-white shadow-sm border border-slate-200 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors text-slate-300">
                    Why did conversions drop?
                  </button>
                  <button className="text-xs bg-white shadow-sm border border-slate-200 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors text-slate-300">
                    Identify best campaigns
                  </button>
                </div>
              </div>
            </div>

            {/* User message */}
            <div className="flex items-start gap-4 justify-end">
              <div className="rounded-2xl rounded-tr-none bg-primary/20 p-4 border border-primary/20 max-w-[85%]">
                <p className="text-sm text-slate-900">Run a Root Cause Analysis on the ROAS drop.</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs font-bold">You</span>
              </div>
            </div>

            {/* System response */}
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <BrainCircuit className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-white/10 p-4 border border-slate-200 max-w-[85%]">
                <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" /> Root Cause Analysis Complete
                </h4>
                <p className="text-sm text-slate-300 mb-3">
                  I investigated 45 campaigns, landing page bounce rates, and channel CPA. The 12% drop in ROAS over the last 7 days is primarily driven by:
                </p>
                <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
                  <li><strong className="text-slate-900">B2B SaaS LinkedIn:</strong> CPC increased by $4.20, draining $2,500 budget with 0 conversions.</li>
                  <li><strong className="text-slate-900">Pricing Page:</strong> Bounce rate spiked from 42% to 68% for mobile users specifically.</li>
                </ul>
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-xs font-semibold text-rose-600">Recommendation:</p>
                  <p className="text-xs text-slate-900 mt-1">Pause LinkedIn ads immediately and revert mobile pricing page design.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white shadow-sm border-t border-slate-200">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask about your marketing data..."
                className="w-full bg-black/20 border border-slate-200 rounded-full py-3 pl-4 pr-12 text-sm text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                className="absolute right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                onClick={() => {
                  trackEvent('ai_assistant_usage', { query_length: query.length })
                }}
              >
                <Send className="h-4 w-4 text-slate-900 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Generated Insights Sidebar */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" /> Auto-Generated Insights
          </h3>
          
          <InsightCard 
            priority="High"
            confidence={94}
            title="Untapped Audience Segment"
            description="Users from Texas have a 25% higher conversion rate but only receive 2% of total ad spend."
          />
          <InsightCard 
            priority="Medium"
            confidence={82}
            title="Email Cadence Fatigue"
            description="Open rates for your Tuesday newsletter dropped 15%. Consider shifting to bi-weekly."
          />
          <InsightCard 
            priority="Low"
            confidence={76}
            title="SEO Keyword Opportunity"
            description="Your brand is ranking #12 for 'enterprise analytics software' with high impression volume."
          />
        </div>
      </div>
    </div>
  )
}

function InsightCard({ priority, confidence, title, description }: any) {
  const getPriorityColor = () => {
    if (priority === 'High') return 'text-rose-600 bg-red-500/10 border-red-500/20'
    if (priority === 'Medium') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
    return 'text-emerald-600 bg-green-500/10 border-green-500/20'
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5  hover:bg-white/10 transition-colors group cursor-pointer">
      <div className="flex justify-between items-center mb-3">
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getPriorityColor()}`}>
          {priority} Priority
        </span>
        <span className="text-xs text-slate-500 flex items-center">
          <Zap className="h-3 w-3 mr-1 text-primary" /> {confidence}% confidence
        </span>
      </div>
      <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-xs text-slate-500 line-clamp-3">{description}</p>
      <div className="mt-3 flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        View details <ArrowRight className="ml-1 h-3 w-3" />
      </div>
    </div>
  )
}

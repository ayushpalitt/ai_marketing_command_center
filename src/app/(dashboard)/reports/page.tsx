"use client"
import { FileText, Download, Play, CheckCircle2, ChevronRight, FilePieChart } from "lucide-react"
import { trackEvent } from "@/lib/tracking"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Reports</h1>
          <p className="text-sm text-slate-400 mt-1">AI-generated business reports for stakeholders.</p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button className="flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <Play className="mr-2 h-4 w-4" /> Generate New Report
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Weekly Report Card */}
        <div className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:border-primary/50 transition-colors relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20">
              <FilePieChart className="h-6 w-6 text-indigo-400" />
            </div>
            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Ready
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white">Weekly Performance</h3>
            <p className="mt-1 text-sm text-slate-400">Nov 13 - Nov 19, 2023</p>
          </div>
          <div className="mt-6 flex space-x-3">
            <button className="flex flex-1 items-center justify-center rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
              <FileText className="mr-2 h-4 w-4" /> View
            </button>
            <button 
              className="flex flex-1 items-center justify-center rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
              onClick={() => trackEvent('report_download', { report_type: 'weekly_performance', format: 'pdf' })}
            >
              <Download className="mr-2 h-4 w-4" /> PDF
            </button>
          </div>
          {/* Decorative blur */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
        </div>

        {/* Monthly Report Card */}
        <div className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:border-purple-500/50 transition-colors relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
              <FilePieChart className="h-6 w-6 text-purple-400" />
            </div>
            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Ready
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white">October Monthly Review</h3>
            <p className="mt-1 text-sm text-slate-400">Oct 1 - Oct 31, 2023</p>
          </div>
          <div className="mt-6 flex space-x-3">
            <button className="flex flex-1 items-center justify-center rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
              <FileText className="mr-2 h-4 w-4" /> View
            </button>
            <button 
              className="flex flex-1 items-center justify-center rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
              onClick={() => trackEvent('report_download', { report_type: 'monthly_review', format: 'ppt' })}
            >
              <Download className="mr-2 h-4 w-4" /> PPT
            </button>
          </div>
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-semibold text-lg">AI Report Settings</h3>
          <button className="text-sm text-primary hover:underline">Edit configuration</button>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300">Included Sections</h4>
              <ul className="space-y-2">
                {["Executive Summary", "Traffic Overview", "Campaign Analysis", "Revenue Analysis", "KPI Trends", "Strategic Recommendations"].map(section => (
                  <li key={section} className="flex items-center text-sm text-slate-400">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> {section}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300">AI Personality</h4>
              <div className="rounded-lg border border-white/10 p-4 bg-[#0F172A]/50">
                <p className="text-sm font-medium text-white mb-1">Data-Driven Executive</p>
                <p className="text-xs text-slate-400">Focuses on bottom-line impact, ROI, and actionable strategic insights. Uses formal business language.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

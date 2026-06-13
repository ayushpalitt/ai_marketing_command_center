"use client"
import { ShieldAlert, ShieldCheck, AlertTriangle, XCircle, DatabaseBackup, RefreshCw, ChevronRight } from "lucide-react"

const qualityIssues = [
  { id: 1, type: "Missing Values", entity: "Campaigns", field: "cost", count: 24, severity: "High", status: "Open", impact: "ROAS calculation failing for Q3 campaigns." },
  { id: 2, type: "Broken Tracking", entity: "Traffic", field: "source", count: 1850, severity: "Critical", status: "Open", impact: "Unattributed traffic inflating 'Direct' source bucket." },
  { id: 3, type: "Invalid Conversion", entity: "Events", field: "revenue", count: 12, severity: "Medium", status: "Open", impact: "Negative revenue values detected (-$500)." },
  { id: 4, type: "Duplicate Record", entity: "Leads", field: "email", count: 89, severity: "Low", status: "Resolved", impact: "Cleaned automatically via deduplication rule." },
  { id: 5, type: "Naming Convention", entity: "Campaigns", field: "campaign_name", count: 5, severity: "Medium", status: "Open", impact: "Missing geo-tags in campaign names breaking segment filters." },
]

export default function DataQualityPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldAlert className="h-8 w-8 text-primary" /> Data Quality Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">Monitor, detect, and remediate data integrity issues automatically.</p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button className="flex items-center rounded-md border border-slate-200 bg-white shadow-sm px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <DatabaseBackup className="mr-2 h-4 w-4" /> Export Log
          </button>
          <button className="flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-slate-900 hover:bg-primary/90 transition-colors">
            <RefreshCw className="mr-2 h-4 w-4" /> Run Deep Scan
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1 rounded-xl border border-slate-200 bg-white shadow-sm p-6  flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Overall Data Quality</h3>
          <div className="relative h-32 w-32 flex items-center justify-center rounded-full border-8 border-yellow-500/20">
            <div className="absolute inset-0 rounded-full border-8 border-yellow-400 border-l-transparent border-b-transparent transform rotate-45"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-extrabold text-slate-900">78</span>
              <span className="text-[10px] text-yellow-400 font-bold uppercase">Needs Attention</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Score dropped 4 points due to recent tracking anomalies.</p>
        </div>

        <div className="md:col-span-3 rounded-xl border border-slate-200 bg-white shadow-sm p-6  flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">AI</span>
            </div>
            <h3 className="text-lg font-medium text-slate-900">Automated Remediation Plan</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            I have detected <strong className="text-rose-600">1,850 sessions</strong> with broken tracking parameters originating from the new landing page deployment. I can retroactively map these to the 'Paid Social' channel using referral domain matching. 
            <br/><br/>
            Additionally, I found <strong className="text-yellow-400">24 campaigns</strong> missing cost data from the API sync. Would you like me to trigger a forced re-sync with the ad platforms?
          </p>
          <div className="mt-5 flex gap-3">
            <button className="px-4 py-2 bg-green-500/20 text-emerald-600 text-sm font-medium rounded-md hover:bg-green-500/30 transition-colors">
              Fix Tracking Automatically
            </button>
            <button className="px-4 py-2 bg-white shadow-sm border border-slate-200 text-slate-900 text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              Force API Re-sync
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm  overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Active Quality Alerts</h3>
          <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-md text-slate-300">4 Open Issues</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white shadow-sm text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Issue Type</th>
                <th className="px-6 py-4 font-medium">Entity / Field</th>
                <th className="px-6 py-4 font-medium">Records Affected</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Impact</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {qualityIssues.map((issue) => (
                <tr key={issue.id} className={`transition-colors ${issue.status === 'Resolved' ? 'opacity-50' : 'hover:bg-white shadow-sm'}`}>
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                    {issue.severity === 'Critical' ? <XCircle className="h-4 w-4 text-rose-600" /> : 
                     issue.severity === 'High' ? <AlertTriangle className="h-4 w-4 text-yellow-400" /> : 
                     issue.status === 'Resolved' ? <ShieldCheck className="h-4 w-4 text-emerald-600" /> :
                     <AlertTriangle className="h-4 w-4 text-slate-500" />}
                    {issue.type}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500">{issue.entity}</span> <ChevronRight className="inline h-3 w-3 text-slate-600" /> <span className="font-mono text-xs">{issue.field}</span>
                  </td>
                  <td className="px-6 py-4 font-mono">{issue.count.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      issue.severity === 'Critical' ? 'bg-red-500/10 text-rose-600 border border-red-500/20' :
                      issue.severity === 'High' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                      'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                    }`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 max-w-[200px] truncate" title={issue.impact}>
                    {issue.impact}
                  </td>
                  <td className="px-6 py-4">
                    {issue.status === 'Resolved' ? (
                      <span className="text-xs text-emerald-600 font-medium">Resolved</span>
                    ) : (
                      <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">Review</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

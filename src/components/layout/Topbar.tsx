"use client"
import { Bell, Search } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

export function Topbar() {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#0F172A]/80 px-6 backdrop-blur-md">
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border border-white/10 bg-white/5 py-2 pl-10 pr-3 text-sm text-white placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
            placeholder="Search campaigns, insights, or ask AI..."
          />
        </div>
      </div>
      <div className="ml-4 flex items-center space-x-4">
        <button className="relative rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="h-8 w-8 rounded-full border border-white/10 bg-white/5">
          <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
        </div>
      </div>
    </div>
  )
}

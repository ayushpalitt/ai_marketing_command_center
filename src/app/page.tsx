import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0F172A] text-white p-24">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="z-10 flex flex-col items-center text-center space-y-8 max-w-3xl">
        <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <Activity className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
          NEXUS ANALYTICS
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl">
          The ultimate enterprise intelligence platform. Unite your campaigns, analyze traffic, simulate outcomes, and leverage AI to drive ROI.
        </p>
        <div className="flex items-center gap-4 pt-8">
          <Link href="/sign-up" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/sign-in" className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10">
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}

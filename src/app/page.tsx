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
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-24 relative overflow-hidden">
      {/* We can use a subtle grid pattern or leave it clean. Removing the dark mask image. */}
      <div className="absolute inset-0 bg-slate-50/50 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="z-10 flex flex-col items-center text-center space-y-8 max-w-3xl">
        <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mb-4 ring-1 ring-blue-100">
          <Activity className="h-10 w-10 text-blue-600" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
          NEXUS ANALYTICS
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl">
          The ultimate enterprise intelligence platform. Unite your campaigns, analyze traffic, simulate outcomes, and leverage AI to drive ROI.
        </p>
        
        <div className="flex items-center gap-4 pt-8">
          <Link href="/sign-up" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/sign-in" className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-8 py-3 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50">
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}

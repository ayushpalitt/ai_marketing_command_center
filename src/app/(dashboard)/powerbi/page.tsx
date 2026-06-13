"use client"
import { useState, useEffect } from 'react';
// We use dynamic import for powerbi-client-react to avoid SSR issues
import dynamic from 'next/dynamic';
import { BarChart3, Lock, ShieldAlert } from 'lucide-react';

// Next.js dynamic import for client-side only rendering
const PowerBIEmbed = dynamic(
  () => import('powerbi-client-react').then(mod => mod.PowerBIEmbed),
  { ssr: false }
);

export default function PowerBIPage() {
  const [authError, setAuthError] = useState<boolean>(false);
  const [reportConfig, setReportConfig] = useState<any>({
    type: 'report',
    embedUrl: undefined,
    tokenType: 1, 
    accessToken: undefined,
    settings: {
      panes: {
        filters: { expanded: false, visible: false },
        pageNavigation: { visible: true }
      },
      background: 1,
    }
  });

  useEffect(() => {
    import('powerbi-client').then((pbClient) => {
      fetch('https://playgroundbe-bck-1.azurewebsites.net/Reports/SampleReport')
        .then(res => {
          if (!res.ok) throw new Error("Playground API Down");
          return res.json();
        })
        .then(data => {
          setReportConfig((prev: any) => ({
            ...prev,
            embedUrl: data.EmbedUrl,
            accessToken: data.EmbedToken.Token,
            id: data.Id,
            tokenType: pbClient.models.TokenType.Embed,
            settings: {
              ...prev.settings,
              background: pbClient.models.BackgroundType.Transparent
            }
          }));
        })
        .catch(err => {
          console.error("Error fetching Power BI token. Microsoft Playground Sandbox may be offline:", err);
          setAuthError(true);
        });
    });
  }, []);

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-[#F2C811]" /> Power BI Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Enterprise analytics rendered securely via Microsoft Power BI Embedded.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
           <div className={`px-3 py-1 border rounded-full text-xs font-medium flex items-center ${authError ? 'bg-red-500/10 text-rose-600 border-red-500/20' : 'bg-green-500/10 text-emerald-600 border-green-500/20'}`}>
             <div className={`h-2 w-2 rounded-full mr-2 ${authError ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
             {authError ? 'Auth Failed' : 'Live Connection'}
           </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-slate-200 bg-white p-2  relative overflow-hidden flex flex-col items-center justify-center">
        {authError ? (
          <div className="text-center max-w-md p-8 rounded-2xl border border-white/5 bg-white shadow-sm backdrop-blur-xl shadow-2xl">
            <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <Lock className="h-8 w-8 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Enterprise Authentication Required</h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Secure Power BI embedding requires a valid Microsoft Azure Active Directory token. Please connect your Azure Service Principal credentials in settings to view live corporate reports.
            </p>
            <div className="bg-black/30 rounded-lg p-4 text-left border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="h-4 w-4 text-[#F2C811]" />
                <span className="text-xs font-semibold text-slate-300">Missing Credentials</span>
              </div>
              <code className="text-[10px] text-slate-500 block">AZURE_TENANT_ID=missing</code>
              <code className="text-[10px] text-slate-500 block">AZURE_CLIENT_ID=missing</code>
              <code className="text-[10px] text-slate-500 block">POWERBI_WORKSPACE_ID=missing</code>
            </div>
          </div>
        ) : reportConfig.accessToken ? (
          <PowerBIEmbed
            embedConfig={reportConfig}
            cssClassName="h-full w-full rounded-lg"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-black/20 rounded-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#F2C811] border-t-transparent"></div>
              <p className="text-sm text-slate-500 animate-pulse">Authenticating with Azure Active Directory...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

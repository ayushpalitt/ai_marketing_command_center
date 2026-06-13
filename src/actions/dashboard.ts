"use server"

import { prisma } from "@/lib/prisma"

export async function getDashboardMetrics(dateRange: string) {
  try {
    const now = new Date();
    let startDate = new Date();

    if (dateRange === "7D") {
      startDate.setDate(now.getDate() - 7);
    } else if (dateRange === "30D") {
      startDate.setDate(now.getDate() - 30);
    } else if (dateRange === "90D") {
      startDate.setDate(now.getDate() - 90);
    } else if (dateRange === "YTD") {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    // 1. Fetch KPI Metrics
    // Traffic KPI
    const trafficAggr = await prisma.trafficData.aggregate({
      where: { date: { gte: startDate } },
      _sum: { sessions: true }
    });

    // Campaign KPIs
    const campaignAggr = await prisma.campaign.aggregate({
      where: { createdAt: { gte: startDate } },
      _sum: { revenue: true, clicks: true, impressions: true, conversions: true }
    });

    const totalSessions = trafficAggr._sum.sessions || 0;
    const totalRevenue = campaignAggr._sum.revenue || 0;
    const clicks = campaignAggr._sum.clicks || 0;
    const impressions = campaignAggr._sum.impressions || 0;
    const conversions = campaignAggr._sum.conversions || 0;

    const avgCtr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : "0.00";
    const conversionRate = clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : "0.00";

    // 2. Fetch Chart Data (Grouped by Date)
    // To keep it simple, we'll fetch raw rows and group them in JavaScript
    // because Prisma doesn't have a native DATE() grouping without raw queries in Postgres.
    
    const trafficRows = await prisma.trafficData.findMany({
      where: { date: { gte: startDate } },
      select: { date: true, sessions: true }
    });

    const campaignRows = await prisma.campaign.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true, revenue: true }
    });

    // Grouping dictionary
    const chartMap = new Map<string, { name: string, traffic: number, revenue: number }>();

    // Helper to format date string
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Pre-fill last N days to ensure the chart looks continuous even if data is sparse
    const daysToFill = dateRange === "7D" ? 7 : dateRange === "30D" ? 30 : dateRange === "90D" ? 90 : 365;
    const maxDays = Math.min(daysToFill, 90); // Cap chart dots at 90 for performance
    
    for (let i = maxDays; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const name = formatDate(d);
      chartMap.set(name, { name, traffic: 0, revenue: 0 });
    }

    trafficRows.forEach(row => {
      const name = formatDate(row.date);
      if (chartMap.has(name)) {
        chartMap.get(name)!.traffic += row.sessions;
      }
    });

    campaignRows.forEach(row => {
      const name = formatDate(row.createdAt);
      if (chartMap.has(name)) {
        chartMap.get(name)!.revenue += row.revenue;
      }
    });

    const chartData = Array.from(chartMap.values());

    return {
      kpis: {
        totalSessions,
        totalRevenue,
        avgCtr,
        conversionRate,
      },
      chartData
    };
  } catch (error) {
    console.error("Dashboard Metrics Error:", error);
    // Fallback data if DB is empty or fails
    return {
      kpis: {
        totalSessions: 0,
        totalRevenue: 0,
        avgCtr: "0.00",
        conversionRate: "0.00"
      },
      chartData: []
    };
  }
}

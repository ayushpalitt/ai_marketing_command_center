import { PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse'
import https from 'https'

const prisma = new PrismaClient()

// Utility to generate random dates within the last 24 months
function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Utility for random numbers
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility for random floats
function getRandomFloat(min: number, max: number, decimals: number = 2) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

const CHANNELS = ["Google Ads", "Meta Ads", "LinkedIn Ads", "Email", "Organic Search", "Direct", "Referral", "TikTok Ads"];
const CAMPAIGN_PREFIXES = ["Q1", "Q2", "Q3", "Q4", "Summer", "Winter", "Black Friday", "Flash Sale", "Retargeting", "Brand", "Competitor"];
const CAMPAIGN_SUFFIXES = ["Promo", "Awareness", "Conversion", "Lead Gen", "Max", "Display", "Search", "Video"];

const TRAFFIC_SOURCES = ["google", "direct", "bing", "facebook", "linkedin", "twitter", "newsletter", "referral"];

async function main() {
  console.log("Cleaning up existing data...");
  await prisma.trafficData.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.journeyEvent.deleteMany();
  await prisma.dataQualityIssue.deleteMany();
  await prisma.forecast.deleteMany();
  await prisma.insight.deleteMany();

  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 24); // 24 months ago

  console.log("Fetching real-world Facebook Ads dataset...");
  const campaignsToInsert: any[] = [];
  
  await new Promise((resolve, reject) => {
    https.get('https://raw.githubusercontent.com/ychennay/ychennay.github.io/master/KAG_conversion_data.csv', (res) => {
      res.pipe(parse({ columns: true }))
        .on('data', (row: any) => {
          const spend = parseFloat(row.Spent);
          const impressions = parseInt(row.Impressions);
          const clicks = parseInt(row.Clicks);
          const conversions = parseInt(row.Total_Conversion);
          const revenue = conversions * getRandomFloat(100, 250);

          campaignsToInsert.push({
            campaignName: `FB Campaign ${row.xyz_campaign_id} - Ad ${row.ad_id}`,
            channel: 'Facebook Ads',
            impressions,
            clicks,
            cost: spend,
            conversions,
            revenue,
            createdAt: getRandomDate(startDate, endDate),
            updatedAt: endDate
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });
  });

  // Insert campaigns in batches
  const BATCH_SIZE = 1000;
  for (let i = 0; i < campaignsToInsert.length; i += BATCH_SIZE) {
    const batch = campaignsToInsert.slice(i, i + BATCH_SIZE);
    await prisma.campaign.createMany({ data: batch });
    console.log(`Inserted ${Math.min(i + BATCH_SIZE, campaignsToInsert.length)} campaigns...`);
  }

  console.log("Generating 100,000+ Traffic Data Records...");
  const trafficToInsert = [];
  
  // We need ~100k records. Across 730 days, that's ~137 records per day.
  // We'll just generate 100,000 random records across the 24 month span
  for (let i = 0; i < 100000; i++) {
    const source = TRAFFIC_SOURCES[getRandomInt(0, TRAFFIC_SOURCES.length - 1)];
    const isAnomaly = Math.random() < 0.005; // 0.5% chance
    
    let users = getRandomInt(10, 1000);
    let sessions = users + getRandomInt(0, Math.floor(users * 0.5));
    let bounceRate = getRandomFloat(0.2, 0.8);
    let conversions = Math.floor(sessions * getRandomFloat(0.01, 0.1));

    if (isAnomaly) {
      if (Math.random() > 0.5) {
        // Massive bounce rate anomaly
        bounceRate = 1.0;
        conversions = 0;
      } else {
        // Negative users anomaly (data quality issue)
        users = -100;
      }
    }

    trafficToInsert.push({
      date: getRandomDate(startDate, endDate),
      source,
      users,
      sessions,
      bounceRate,
      conversions,
      createdAt: new Date()
    });
  }

  // Insert traffic data in batches to avoid memory limits and query size limits
  const TRAFFIC_BATCH_SIZE = 5000;
  for (let i = 0; i < trafficToInsert.length; i += TRAFFIC_BATCH_SIZE) {
    const batch = trafficToInsert.slice(i, i + TRAFFIC_BATCH_SIZE);
    await prisma.trafficData.createMany({ data: batch });
    console.log(`Inserted ${Math.min(i + TRAFFIC_BATCH_SIZE, trafficToInsert.length)} traffic records...`);
  }

  console.log("Generating Data Quality Issues...");
  await prisma.dataQualityIssue.createMany({
    data: [
      {
        type: "Anomaly",
        description: "Negative user counts detected in Direct traffic source.",
        severity: "High",
        resolved: false,
        createdAt: new Date()
      },
      {
        type: "Anomaly",
        description: "Campaign 'Q3 Meta Ads Display 142' spent $50,000 with 0 conversions.",
        severity: "Critical",
        resolved: false,
        createdAt: new Date()
      },
      {
        type: "Missing Data",
        description: "Cost metrics missing for 25 recent campaigns.",
        severity: "Medium",
        resolved: false,
        createdAt: new Date()
      }
    ]
  });

  console.log("Database seeded successfully with 100k+ enterprise-scale mock records.");
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

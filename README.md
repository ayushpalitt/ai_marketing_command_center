<div align="center">
  <img src="https://img.icons8.com/color/96/000000/combo-chart--v1.png" alt="Nexus Analytics Logo" width="80" />

  # Nexus Analytics Command Center

  **Enterprise B2B SaaS Platform for Marketing Intelligence & Data Orchestration**

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)
  [![PowerBI](https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)](https://powerbi.microsoft.com/)

</div>

<br />

## 📖 Overview

**Nexus Analytics** is a production-grade, full-stack enterprise Command Center designed to ingest, aggregate, and visualize multi-channel marketing data. Built to mimic the architecture of top-tier SaaS products (e.g., Databricks, Snowflake, Salesforce), it provides marketing executives and analysts with a consolidated view of Campaign ROI, Traffic Anomalies, and Conversion Pipelines.

This project demonstrates advanced competence in **React Server Components (RSC)**, **Complex Database Aggregation (Prisma)**, and **Enterprise System Integration (Power BI / Azure)**.

---

## ⚡ Core Architecture

The platform operates on a robust, scalable architecture utilizing Next.js Server Actions to securely query a distributed PostgreSQL database, piping aggregated KPIs directly into a responsive React frontend.

```mermaid
graph TD
    Client[Client Browser / Executive Dashboard] -->|User Interaction| UI[Next.js 15 UI Layer]
    UI -->|Server Actions| SA[Next.js Edge Server]
    SA -->|Prisma Client| DB[(Neon PostgreSQL)]
    SA -->|Auth Tokens| Clerk[Clerk Authentication]
    UI -->|Embed Tokens| PBI[Azure / Power BI Service]
    
    subgraph Data Pipeline
    DB --> |100k+ Rows| Agg[Real-time Aggregation Engine]
    Agg --> |JSON| SA
    end
```

---

## 📊 Database Entity Relationship

Nexus operates on a heavily relational PostgreSQL database, currently seeded with over **100,000+ rows** of real-world Kaggle conversion metrics to simulate enterprise scale.

```mermaid
erDiagram
    CAMPAIGN ||--o{ TRAFFIC_DATA : generates
    CAMPAIGN {
        string id PK
        string campaignName
        float revenue
        int clicks
        int impressions
        int conversions
    }
    TRAFFIC_DATA {
        string id PK
        DateTime date
        string source
        int sessions
        float bounceRate
    }
    USER ||--o{ INSIGHT : reviews
    USER {
        string id PK
        string email
    }
    INSIGHT {
        string id PK
        string insightText
        float confidence
    }
```

---

## 🚀 Key Enterprise Features

- **Full-Stack Data Aggregation:** Next.js Server Actions execute advanced Prisma mathematical aggregations (e.g., Conversion Rate `(conversions / clicks) * 100`) natively on the server, drastically reducing client-side JavaScript payloads.
- **Enterprise Light Mode UI:** Built with Tailwind CSS, utilizing a crisp, highly legible `slate-50` aesthetic synonymous with modern B2B SaaS standards (Genpact, Snowflake).
- **Embedded Analytics POC:** Integration of `powerbi-client-react`, demonstrating the ability to securely embed enterprise Microsoft ecosystem reporting directly into a third-party React application.
- **Dynamic Recharts Data-Vis:** Custom-configured `<AreaChart>` and `<LineChart>` visualizations that dynamically redraw themselves based on live database queries triggered by stateful timeframe filters (7D, 30D, YTD).
- **Enterprise Authentication:** Protected routing using Clerk, ensuring that raw operational metrics and Power BI tokens are safely gated behind secure session management.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.17+
- A Neon PostgreSQL Database
- Clerk Authentication Keys

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ayushpalitt/ai_marketing_command_center.git
cd ai_marketing_command_center
```

2. Install dependencies:
```bash
npm install
```

3. Configure your `.env`:
```bash
DATABASE_URL="postgresql://user:pass@ep-restless-bird.neon.tech/neondb?sslmode=require"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

4. Seed the enterprise Kaggle database:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

5. Run the development server:
```bash
npm run dev
```

---

## 💼 Why This Matters (For Recruiters/Engineering Managers)

This project is not a typical CRUD application. It was architected to solve specific business problems: **Data Fragmentation** and **Executive Legibility**. By demonstrating the ability to handle large datasets, execute complex SQL aggregations securely on the server, and present that data in a highly polished, B2B-ready interface, it serves as a testament to my readiness for a high-level **Software Engineering or Business Analytics** role.

<br />

<div align="center">
  <i>Architected and engineered by Ayush Palit.</i>
</div>

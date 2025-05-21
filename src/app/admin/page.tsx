import { getStats, getWeeklySales } from "@/lib/api";
import { DashboardAdmin } from "./_components/dashboard";

export default async function DashboardPage() {
  const [stats, sales] = await Promise.all([getStats(), getWeeklySales()]);
  return (
    <main>
      <DashboardAdmin stats={stats} sales={sales} />
    </main>
  );
}

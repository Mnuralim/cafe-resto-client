import { getReports } from "@/lib/api";
import { ListReports } from "./_components/list-reports";

export default async function ReportPage() {
  const reports = await getReports();

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <ListReports data={reports} />
    </main>
  );
}

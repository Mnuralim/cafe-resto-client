import { getReports } from "@/lib/api";
import { ListReports } from "./_components/list-reports";

interface Props {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export default async function ReportPage({ searchParams }: Props) {
  const { startDate, endDate, sortBy, sortReport } = await searchParams;
  const reports = await getReports(startDate, endDate, sortBy, sortReport);

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <ListReports data={reports} currentSortReport={sortReport} />
    </main>
  );
}

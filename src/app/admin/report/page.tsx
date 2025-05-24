import { getReports } from "@/lib/api";
import { ListReports } from "./_components/list-reports";
import { cookies } from "next/headers";

interface Props {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export default async function ReportPage({ searchParams }: Props) {
  const token = (await cookies()).get("token")?.value;
  const { startDate, endDate, sortBy, sortReport } = await searchParams;
  const reports = await getReports(
    token!,
    startDate,
    endDate,
    sortBy,
    sortReport
  );

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <ListReports data={reports} currentSortReport={sortReport} />
    </main>
  );
}

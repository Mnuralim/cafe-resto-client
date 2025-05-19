import { getAllOrders } from "@/lib/api";
import { ListOrder } from "./_components/list-order";

interface Props {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}
export default async function OrdersPage({ searchParams }: Props) {
  const { search, startDate, endDate, status, sortBy, sortOrder, page, limit } =
    await searchParams;
  const orders = await getAllOrders(
    page,
    limit,
    search,
    startDate,
    endDate,
    status,
    sortBy,
    sortOrder
  );

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <ListOrder
        data={orders}
        currentSortOrder={sortOrder}
        currentLimit={limit}
      />
    </main>
  );
}

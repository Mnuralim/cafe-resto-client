import { getAllTables, getOrderById } from "@/lib/api";
import { UserOrderDetail } from "./_components/order-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function HistoryDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrderById(id);
  const tables = await getAllTables();
  if (!order) {
    return <div>Order not found</div>;
  }
  return (
    <div>
      <UserOrderDetail tables={tables} order={order} />
    </div>
  );
}

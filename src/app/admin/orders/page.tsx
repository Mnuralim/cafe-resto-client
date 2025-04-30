import { getAllOrders } from "@/lib/api";
import { ListOrder } from "./_components/list-order";

export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <ListOrder data={orders} />
    </main>
  );
}

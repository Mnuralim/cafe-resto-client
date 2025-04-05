import { getAllOrders } from "@/lib/api";
import { ListOrder } from "./_components/list-order";

export default async function OrdersPage() {
  const orders = await getAllOrders();
  return (
    <div>
      <ListOrder data={orders} />
    </div>
  );
}

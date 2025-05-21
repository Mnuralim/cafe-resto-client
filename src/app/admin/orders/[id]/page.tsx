import { getOrderById } from "@/lib/api";
import { DetailOrder } from "./_components/detail-order";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailOrderPage({ params }: Props) {
  const id = (await params).id;
  const order = await getOrderById(id);
  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="w-full">
      <DetailOrder order={order} />
    </div>
  );
}

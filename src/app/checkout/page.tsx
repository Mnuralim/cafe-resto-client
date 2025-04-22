import { getTableById } from "@/lib/api";
import { Checkout } from "./_components/checkout";

interface Props {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { table = undefined } = await searchParams;
  const tableData = await getTableById(table || "");
  return (
    <div>
      <Checkout tableNumberData={tableData.number} tableId={tableData.id} />
    </div>
  );
}

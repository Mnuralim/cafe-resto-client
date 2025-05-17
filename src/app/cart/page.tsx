import { BottomNav } from "../_components/bottom-nav";
import { ListCart } from "./_components/list-cart";

export default async function CartPage() {
  return (
    <div>
      <ListCart />
      <BottomNav />
    </div>
  );
}

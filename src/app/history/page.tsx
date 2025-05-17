import { BottomNav } from "../_components/bottom-nav";
import { UserOrderHistory } from "./_components/history-list";

export default function HistoryPage() {
  return (
    <div>
      <UserOrderHistory />
      <BottomNav />
    </div>
  );
}

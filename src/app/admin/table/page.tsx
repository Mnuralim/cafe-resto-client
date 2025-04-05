import { getAllTables } from "@/lib/api";
import { ListTable } from "./_components/list-table";

async function MejaPage() {
  const tables = await getAllTables();
  return (
    <main>
      <ListTable tables={tables} />
    </main>
  );
}

export default MejaPage;

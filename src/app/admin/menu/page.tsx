import { getAllCategories, getAllMenus } from "@/lib/api";
import { ListMenu } from "./_components/list-menu";

export default async function MenuPage() {
  const [menus, categories] = await Promise.all([
    getAllMenus(),
    getAllCategories(),
  ]);
  return (
    <main className="px-5 mt-10">
      <ListMenu data={menus} categories={categories} />
    </main>
  );
}

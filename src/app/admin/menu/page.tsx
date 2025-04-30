import { getAllCategories, getAllMenus } from "@/lib/api";
import { ListMenu } from "./_components/list-menu";

export default async function MenuPage() {
  const [menus, categories] = await Promise.all([
    getAllMenus(),
    getAllCategories(),
  ]);

  return (
    <main className="w-full px-4 sm:px-6 md:px-8 py-6 min-h-screen">
      <ListMenu data={menus} categories={categories} />
    </main>
  );
}

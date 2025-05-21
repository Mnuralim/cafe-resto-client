import { getAllCategories, getAllMenus } from "@/lib/api";
import { ListMenu } from "./_components/list-menu";

interface Props {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

export default async function MenuPage({ searchParams }: Props) {
  const { search, category, sortBy, sortMenu, page, limit } =
    await searchParams;
  const [menus, categories] = await Promise.all([
    getAllMenus(
      search,
      page,
      limit,
      undefined,
      undefined,
      category,
      sortBy,
      sortMenu
    ),
    getAllCategories(),
  ]);

  return (
    <main className="w-full px-4 sm:px-6 md:px-8 py-6 min-h-screen">
      <ListMenu
        data={menus}
        categories={categories}
        currentSortMenu={sortMenu}
        currentSearch={search}
        currentLimit={limit}
      />
    </main>
  );
}

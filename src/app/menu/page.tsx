import { getAllCategories, getAllMenus } from "@/lib/api";
import { MenuList } from "./_components/menu-list";
import { BottomNav } from "../_components/bottom-nav";

interface Props {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

async function MenuPage({ searchParams }: Props) {
  const { search, page, limit, minPrice, maxPrice, category } =
    await searchParams;
  const menus = await getAllMenus(
    search,
    page,
    limit,
    minPrice,
    maxPrice,
    category
  );
  const categories = await getAllCategories();
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <MenuList
        dataMenu={menus}
        categories={categories}
        activeCategory={category}
      />
      <BottomNav />
    </div>
  );
}

export default MenuPage;

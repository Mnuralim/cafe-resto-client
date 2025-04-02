const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getAllMenus(
  search?: string,
  page?: string,
  limit?: string,
  minPrice?: string,
  maxPrice?: string,
  category?: string
) {
  const url = new URL(`${API_URL}/menus`);

  if (search) url.searchParams.set("search", search);
  if (page) url.searchParams.set("page", page.toString());
  if (limit) url.searchParams.set("limit", limit.toString());
  if (minPrice) url.searchParams.set("minPrice", minPrice.toString());
  if (maxPrice) url.searchParams.set("maxPrice", maxPrice.toString());
  if (category) url.searchParams.set("category", category);

  const response = await fetch(url, {
    credentials: "include",
    next: {
      revalidate: 3600 * 24,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch menus");
  }

  const resJson = await response.json();
  const data: MenuApiResponse = resJson;

  return data;
}

export async function getAllCategories() {
  const response = await fetch(`${API_URL}/menus/categories`, {
    next: {
      revalidate: 3600 * 24,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const resJson = await response.json();
  const data: ICategory[] = resJson.data;
  return data;
}

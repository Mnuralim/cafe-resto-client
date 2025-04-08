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

export async function getMenuById(id: string) {
  const response = await fetch(`${API_URL}/menus/${id}`, {
    next: {
      revalidate: 3600 * 24,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }

  const resJson = await response.json();
  const data: IMenu = resJson.data;
  return data;
}

export async function createMenu(data: FormData) {
  const response = await fetch(`${API_URL}/menus`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  return response;
}

export async function updateMenu(id: string, data: FormData) {
  const response = await fetch(`${API_URL}/menus/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: data,
  });

  return response;
}

export async function deleteMenu(id: string) {
  const response = await fetch(`${API_URL}/menus/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return response;
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

export async function getAllTables() {
  const response = await fetch(`${API_URL}/tables`, {
    next: {
      revalidate: 3600 * 24,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const resJson = await response.json();
  const data: ITable[] = resJson.data;
  return data;
}

export async function getAllOrders() {
  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const resJson = await response.json();
  const data: IOrder[] = resJson.data;
  return data;
}

export async function getOrderById(id: string) {
  const response = await fetch(`${API_URL}/orders/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  const resJson = await response.json();
  const data: IOrder = resJson.data;
  return data;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const response = await fetch(`${API_URL}/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({
      status,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return response;
}

export const createTable = async (tableNumber: number) => {
  const response = await fetch(`${API_URL}/tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      tableNumber,
    }),
  });

  return response;
};

export const updateTable = async (tableId: string, tableNumber: number) => {
  const response = await fetch(`${API_URL}/tables/${tableId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      tableNumber,
    }),
  });

  return response;
};

export const deleteTable = async (tableId: string) => {
  const response = await fetch(`${API_URL}/tables/${tableId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
};

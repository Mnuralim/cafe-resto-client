const API_URL =
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || "http://localhost:5000/api/v1";

export async function getAllMenus(
  search?: string,
  page?: string,
  limit?: string,
  minPrice?: string,
  maxPrice?: string,
  category?: string,
  sortBy?: string,
  sortMenu?: string
) {
  const baseUrl = `${API_URL}/menus`;

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (minPrice) params.set("minPrice", minPrice.toString());
  if (maxPrice) params.set("maxPrice", maxPrice.toString());
  if (category) params.set("category", category);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortMenu) params.set("sortMenu", sortMenu);

  const fullUrl = `${baseUrl}${
    params.toString() ? "?" + params.toString() : ""
  }`;

  const response = await fetch(fullUrl, {
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

export async function getAllNotifications(token: string) {
  const response = await fetch(`${API_URL}/notifications`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }
  const resJson = await response.json();

  const data: INotification[] = resJson.data;
  return data;
}

export async function getAllOrders(
  page?: string,
  limit?: string,
  search?: string,
  startDate?: string,
  endDate?: string,
  status?: string,
  sortBy?: string,
  sortOrder?: string
) {
  const url = new URL(`${API_URL}/orders`);

  if (page) url.searchParams.set("page", page);
  if (limit) url.searchParams.set("limit", limit);
  if (search) url.searchParams.set("search", search);
  if (startDate) url.searchParams.set("startDate", startDate);
  if (endDate) url.searchParams.set("endDate", endDate);
  if (status) url.searchParams.set("status", status);
  if (sortBy) url.searchParams.set("sortBy", sortBy);
  if (sortOrder) url.searchParams.set("sortOrder", sortOrder);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const resJson = await response.json();
  const data: OrderApiResponse = resJson;
  return data;
}

export const createOrder = async (
  latitude: number,
  longitude: number,
  customerName: string,
  tableId: string,
  items: {
    menuId: string;
    quantity: number;
    note?: string;
  }[],
  note?: string
) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      latitude,
      longitude,
      customerName,
      tableId,
      items,
      note,
    }),
  });

  return response;
};

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

export const getTableById = async (tableId: string) => {
  const response = await fetch(`${API_URL}/tables/${tableId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    next: {
      revalidate: 3600 * 24,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch table");
  }

  const resJson = await response.json();
  const data: ITable = resJson.data;
  return data;
};

export const readNotification = async (notificationId: string) => {
  const response = await fetch(
    `${API_URL}/notifications/${notificationId}/read`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  return response;
};

export const getReports = async (
  startDate?: string,
  endDate?: string,
  sortBy?: string,
  sortReport?: string
) => {
  const baseUrl = `${API_URL}/reports`;
  const params = new URLSearchParams();

  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortReport) params.set("sortReport", sortReport);

  const fullUrl = `${baseUrl}${
    params.toString() ? "?" + params.toString() : ""
  }`;

  const response = await fetch(fullUrl, {
    method: "GET",
    credentials: "include",
    next: {
      revalidate: 3600 * 24,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  const resJson = await response.json();
  const data: ISalesReport[] = resJson.data;
  return data;
};

export const getStats = async () => {
  const response = await fetch(`${API_URL}/stats`, {
    credentials: "include",
    next: {
      revalidate: 3600 * 24,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  const resJson = await response.json();
  const data: IStats = resJson.data;
  return data;
};

export const getWeeklySales = async () => {
  const response = await fetch(`${API_URL}/stats/weekly-sales`, {
    credentials: "include",
    next: {
      revalidate: 3600 * 24,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weekly sales");
  }

  const resJson = await response.json();
  const data: IWeeklySales[] = resJson.data;
  return data;
};

export const findAdminById = async (token: string) => {
  const response = await fetch(`${API_URL}/admin/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin");
  }

  const resJson = await response.json();
  const data: {
    id: string;
    username: string;
  } = resJson.data;
  return data;
};

interface IMenu {
  id: string;
  name: string;
  image: string;
  price: number;
  status: boolean;
  admin_id: string;
  category: ICategory;
  category_id: string;
  created_at: string;
  updated_at: string;
}

interface Filters {
  category: string;
}

interface Meta {
  totalMenus: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  filters: Filters;
}

interface MenuApiResponse {
  status: string;
  message: string;
  data: IMenu[];
  meta: Meta;
}

interface ICategory {
  id: string;
  name: string;
}

interface ITable {
  id: string;
  number: number;
  qr_code: string;
  admin_id: string;
  created_at: string;
  updated_at: string;
}

interface IOrderItem {
  id: string;
  quantity: number;
  price: number;
  note: string;
  order_id: string;
  menu_id: string;
  created_at: string;
  updated_at: string;
  menu: IMenu;
}

type OrderStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";

interface IOrder {
  id: string;
  customer_name: string;
  total_price: number;
  payment_status: boolean;
  note: string;
  status: OrderStatus;
  table_id: string;
  created_at: string;
  updated_at: string;
  table: ITable;
  orderItems: IOrderItem[];
}

interface INotification {
  id: string;
  message: string;
  read: boolean;
  admin_id: string;
  order_id: string;
  type: "NEW_ORDER" | "ORDER_STATUS_CHANGE" | "PAYMENT_RECEIVED";
  created_at: string;
  updated_at: string;
  order: IOrder;
}

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: {
    id: string;
    name: string;
  };
}
interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

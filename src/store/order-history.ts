import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderHistoryState {
  orders: IOrder[];
  addOrder: (order: IOrder) => void;
  removeOrder: (orderId: string) => void;
  updateOrder: (orderId: string, updatedOrder: Partial<IOrder>) => void;
  clearOrderHistory: () => void;
  getOrdersByStatus: (status: OrderStatus) => IOrder[];
  getOrdersByDateRange: (startDate: string, endDate: string) => IOrder[];
  getOrdersByTable: (tableId: string) => IOrder[];
}

export const useOrderHistoryStore = create<OrderHistoryState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),

      removeOrder: (orderId) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId),
        })),

      updateOrder: (orderId, updatedOrder) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, ...updatedOrder } : order
          ),
        })),

      clearOrderHistory: () => set({ orders: [] }),

      getOrdersByStatus: (status) => {
        return get().orders.filter((order) => order.status === status);
      },

      getOrdersByDateRange: (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();

        return get().orders.filter((order) => {
          const orderDate = new Date(order.created_at).getTime();
          return orderDate >= start && orderDate <= end;
        });
      },

      getOrdersByTable: (tableId) => {
        return get().orders.filter((order) => order.table_id === tableId);
      },
    }),
    {
      name: "order-history",
    }
  )
);

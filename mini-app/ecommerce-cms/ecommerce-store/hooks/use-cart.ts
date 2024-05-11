import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartMethods {
  items: Product[];
  addNewItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartMethods>(
    (set, get) => ({
      items: [],
      addNewItem: (item) => {
        const currentItems = get().items;
        if (currentItems.find((i) => i.id === item.id)) {
          toast("Item already in cart");
          return;
        }

        const newItems = [...currentItems, item];
        toast.success("Item added to cart");

        set({ items: newItems });
      },
      removeItem: (itemId) => {
        const currentItems = get().items;
        set({ items: currentItems.filter((item) => item.id !== itemId) });
        toast.success("Item removed from cart");
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

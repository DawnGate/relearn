import { Product } from "@/types";
import { create } from "zustand";

interface StoreMethods {
  data: Product | null;
  isOpen: boolean;
  onOpen: (data: Product) => void;
  onClose: () => void;
}

export const usePreviewModal = create<StoreMethods>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => {
    set({ data, isOpen: true });
  },
  onClose: () => {
    set({ data: null, isOpen: false });
  },
}));

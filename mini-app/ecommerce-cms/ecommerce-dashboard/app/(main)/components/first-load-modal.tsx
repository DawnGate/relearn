"use client";

import { useEffect } from "react";
import { useModal } from "@/hooks/use-modal";

export const FirstLoadModal = () => {
  const onOpen = useModal((state) => state.onOpen);
  const isOpen = useModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

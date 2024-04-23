"use client";

import { useEffect } from "react";
import { useModal } from "@/hooks/use-modal";

const Page = () => {
  const onOpen = useModal((state) => state.onOpen);
  const isOpen = useModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default Page;

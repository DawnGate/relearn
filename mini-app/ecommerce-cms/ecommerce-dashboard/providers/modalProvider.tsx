"use client";

import { useEffect, useState } from "react";

import { CreateStoreForm } from "@/components/createStoreModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateStoreForm />
    </>
  );
};

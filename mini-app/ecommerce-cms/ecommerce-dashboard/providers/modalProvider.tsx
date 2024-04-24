"use client";

import { useEffect, useState } from "react";

import { AddStoreForm } from "@/components/addStoreModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddStoreForm />
    </>
  );
};

"use client";

import { useEffect, useState } from "react";

interface Props {
  price: string | number;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const Currency = ({ price }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="font-semibold">
      {currencyFormatter.format(Number(price))}
    </div>
  );
};

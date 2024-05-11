"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const NavbarAction = () => {
  const cartItems = useCart((state) => state.items);

  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const handleGoToCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={handleGoToCart}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cartItems.length}
        </span>
      </Button>
    </div>
  );
};

"use client";

import { toast } from "sonner";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";

interface ButtonSubscriptionProps {
  isPro: boolean;
}

export const ButtonSubscription = ({ isPro }: ButtonSubscriptionProps) => {
  const openModal = useProModal((state) => state.onOpen);

  const { isLoading, execute } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onClickSubscription = () => {
    if (isPro) {
      execute({});
    } else {
      openModal();
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={onClickSubscription}
      variant="primary"
    >
      {isPro ? "Manage subscription" : "Upgrade to Pro"}
    </Button>
  );
};

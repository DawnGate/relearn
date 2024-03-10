import { checkSubscription } from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";

import { ButtonSubscription } from "./_components/button-subscription";
import { Info } from "../_components/info";

const BillingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <ButtonSubscription isPro={isPro} />
    </div>
  );
};

export default BillingPage;

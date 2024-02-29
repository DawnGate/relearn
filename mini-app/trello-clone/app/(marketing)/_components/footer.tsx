import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full border-t bg-slate-100 p-4">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <Logo />
        <div className="flex w-full items-center justify-between md:w-auto md:gap-x-4">
          <Button size="sm" variant="ghost">
            Privacy policy
          </Button>
          <Button size="sm" variant="ghost">
            Term of Service
          </Button>
        </div>
      </div>
    </div>
  );
};

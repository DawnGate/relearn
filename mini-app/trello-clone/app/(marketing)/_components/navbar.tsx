import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full border-b bg-white p-4 shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <Logo />
        <div className="flex w-full items-center justify-between md:w-auto md:gap-x-4">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

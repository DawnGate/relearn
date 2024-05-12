import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismaDb from "@/lib/prismadb";

import { ThemeToggle } from "@/components/themeToggle";
import { StoreSwitcher } from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismaDb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </div>
  );
};

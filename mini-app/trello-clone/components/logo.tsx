import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const customFont = localFont({
  src: "../public/fonts/font.woff2",
  display: "swap",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center gap-2 transition hover:opacity-75 md:flex">
        <Image
          alt="logo"
          src="/logo.svg"
          width={30}
          height={30}
          className="h-[30px] w-[30px]"
        />
        <p className={cn("text-lg text-neutral-700", customFont.className)}>
          Taskify
        </p>
      </div>
    </Link>
  );
};

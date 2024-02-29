import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
  display: "swap",
});

const familyFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Marketing = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={cn("flex flex-col items-center", headingFont.className)}>
        <div className="mb-4 flex items-center space-x-2 rounded-full bg-amber-100 p-4 uppercase text-amber-700 shadow-sm">
          <Medal className="h-6 w-6" />
          <div>No 1 task management</div>
        </div>
        <div className="mb-6 text-3xl text-neutral-800 md:text-6xl">
          Taskify help team move
        </div>
        <div className="rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-4 pt-2 text-3xl text-white md:text-6xl">
          work forward.
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl",
          familyFont.className,
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Taskify.
      </div>

      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get tasktify for free</Link>
      </Button>
    </div>
  );
};

export default Marketing;

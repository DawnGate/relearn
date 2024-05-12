import { ReactNode } from "react";

import { ModalProvider } from "@/providers/modalProvider";
import { ToastProvider } from "@/providers/toastProvider";
import { ThemeProvider } from "@/providers/themeProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ToastProvider />
        <ModalProvider />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;

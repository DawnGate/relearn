import { ReactNode } from "react";

import { ModalProvider } from "@/providers/modalProvider";
import { ToastProvider } from "@/providers/toastProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastProvider />
      <ModalProvider />
      {children}
    </>
  );
};

export default Layout;

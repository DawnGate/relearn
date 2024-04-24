import { ModalProvider } from "@/providers/modalProvider";
import { ToastProvider } from "@/providers/toastProvider";
import { ReactNode } from "react";

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

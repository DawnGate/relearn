import { ModalProvider } from "@/providers/modalProvider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ModalProvider />
    </>
  );
};

export default Layout;

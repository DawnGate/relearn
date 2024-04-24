import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>This will be a navbar</div>
      {children}
    </>
  );
};

export default Layout;

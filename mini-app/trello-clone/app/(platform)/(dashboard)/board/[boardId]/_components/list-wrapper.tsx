import { forwardRef } from "react";

interface ListWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}

export const ListWrapper = forwardRef<HTMLLIElement, ListWrapperProps>(
  ({ children, ...rest }: ListWrapperProps, ref) => {
    return (
      <li ref={ref} {...rest} className="h-full w-[272px] shrink-0 select-none">
        {children}
      </li>
    );
  },
);

ListWrapper.displayName = "ListWrapper";

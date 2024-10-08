import { cn } from "@/lib/utils";
import { ComponentPropsWithRef, forwardRef } from "react";

type HeaderProps = ComponentPropsWithRef<"header">;

const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { className },
  ref
) {
  return (
    <header className={cn(`bg-slate-600 p-2`, className)} ref={ref}>
      This is the header
    </header>
  );
});

export default Header;

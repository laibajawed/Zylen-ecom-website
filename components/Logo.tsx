import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Logo = ({ children }: Props) => {
  return (
    <Link href={"/"}>
      <h2 className={cn("text-2xl font-black tracking-wider uppercase ")}>
        {children}
      </h2>
    </Link>
  );
};
export default Logo;

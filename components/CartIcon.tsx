"use client"
import userCartStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  const{items} = userCartStore()
  return (
    <div>
      <Link href={"/cart"} className="group relative">
        <ShoppingBag className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
        <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 text-sm rounded-full font-semibold flex items-center justify-center">
         {items.length ? items.length : 0}
        </span>
      </Link>
    </div>
  );
};

export default CartIcon;

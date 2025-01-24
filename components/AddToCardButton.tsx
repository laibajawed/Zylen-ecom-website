"use client"
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import React from "react";
import { Button } from "./ui/button";
import QuantityButtons from "./QuantityButtons";
import PriceFormatter from "./PriceFormatter";
import userCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
}

const AddToCardButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = userCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="w-full text-sm">
          <div className=" flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} />
            <div />
            <div className="flex items-center justify-between border-t pt-1">
              <span className="text-xs font-semibold">Subtotal</span>
              <PriceFormatter
                amount={product?.price ? product?.price * itemCount : 0}
              />
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => {
            addItem(product);
            toast.success(
              `${product?.title?.substring(0, 12)}.... added successfully!`
            );
          }}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-transparent text-darkColor shadow-none border border-dark/30 font-semibold tracking-wide hover:text-white hoverEffect",
            className
          )}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default AddToCardButton;

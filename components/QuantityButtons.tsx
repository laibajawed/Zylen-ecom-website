import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import userCartStore from "@/store";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
  const { addItem, getItemCount,removeItem } = userCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;
  const handleRemoveProduct = () => {
    removeItem(product?._id);
   if(itemCount > 1){
    toast.success("Quantity Decreased Successfully!")
   }else{
    toast.success(`${product?.title?.substring(0,12)}... removed successfully!`)
   }
  };
  return (
    <div className={cn("flex items-center gap-1 text-base pb-1", className)}>
      <Button
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Minus />
      </Button>
      <span className="font-semibold w-8 text-center text-darkColor">
        {itemCount}
      </span>
      <Button
        onClick={() => {
          addItem(product);
          toast.success(
            `${product?.title?.substring(0, 12)}.... added successfully!`
          );
        }}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;

"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import EmptyCart from "@/components/EmptyCart";
import useCartStore from "@/store";
import { Heart, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import paypalLogo from "../../images/PayPal_horizontally_Logo_2014.png";
import { Separator } from "@/components/ui/separator";



const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading]=useState(false)

  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
    getGroupedItems,
  } = useCartStore();


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loading />;
  }

  const cartProducts = getGroupedItems();


  const isCartEmpty = cartProducts.length === 0;

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart cleared successfully!");
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product removed successfully!");
  };

  const handleCheckout = () => {
    toast.success('checkout successfully!');
  }

  

  return (
    <div className="bg-gray-50 pb-52 md:pd-10">
      <Container>
        <div className="flex items-center gap-2 py-5 text">
          <ShoppingBag />
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        </div>
        <div className="grid lg:grid-cols-3 md:gap-8">
          {/* Product */}
          <div className="lg:col-span-2 rounded-lg">
            <div className="border bg-white rounded-md">
              {isCartEmpty ? (
                <EmptyCart />
              ) : (
                <>
                  {cartProducts?.map(({ product }) => {
                    const itemCount = getItemCount(product?._id);
                    return (
                      <div
                        key={product?._id}
                        className="border-b 2.5 last:border-b-0 flex items-center justify-between gap-5"
                      >
                        <div className="flex flex-1 items-center gap-2 h-36 md:h-44">
                          {product?.images && (
                            <Link
                              href={`/product/${product?.slug?.current}`}
                              className="border p-0 md:p-1 mr-2 rounded-md overflow-hidden group "
                            >
                              <Image
                                src={urlFor(product?.images[0]).url()}
                                alt="productImage"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                              />
                            </Link>
                          )}
                          <div className="h-full flex flex-1 items-start flex-col justify-between py-1">
                            <div className="space-y-1.5">
                              <h2 className="font-semibold line-clamp-1">
                                {product?.title}
                              </h2>
                              <p className="text-sm text-lightColor font-medium">
                                {product?.intro}
                              </p>
                              <p className="text-sm capitalize">
                                Variant:
                                <span className="font-semibold">
                                  {product?.variant}
                                </span>
                              </p>
                              <p className="text-sm capitalize">
                                Status:
                                <span className="font-semibold">
                                  {product?.status}
                                </span>
                              </p>
                            </div>
                            <div className="text-gray-500 flex items-center gap-3">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Heart className="w-4 h-4 md:w-5 md:h-5 hover:text-green-600 hoverEffect" />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold">
                                    Add to Favorite
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Trash
                                      onClick={() => {
                                        handleDeleteProduct(product?._id);
                                      }}
                                      className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-red-600">
                                    Delete Product
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className="font-bold text-lg"
                            />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Button                            
                    onClick={handleResetCart}
                    className="m-5 font-semibold"
                    variant="destructive"
                  >
                    Reset Cart
                  </Button>
                </>
              )}
            </div>
          </div>
          {/* summary */}
          <div className={"lg:col-span-1"}>
            <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4 ">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <PriceFormatter amount={getSubTotalPrice()} />
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <PriceFormatter
                    amount={getSubTotalPrice() - getTotalPrice()}
                  />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <PriceFormatter
                    amount={getTotalPrice()}
                    className="text-lg font-bold text-black"
                  />
                </div>
                <Button 
                disabled={loading}
                onClick={handleCheckout}
                  className="w-full rounded-full font-semibold tracking-wide"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                <Link
                  href={"/"}
                  className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:bg- hoverEffect"
                >
                  <Image src={paypalLogo} alt="PayPal" className="w-20" />
                </Link>
              </div>
            </div>
          </div>
          {/* order summary for mobile view*/}
          <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
            <div className="p-4 rounded-lg border mx-4">
            <h2 className="text-xl font-semibold mb-4 ">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <PriceFormatter amount={getSubTotalPrice()} />
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <PriceFormatter
                    amount={getSubTotalPrice() - getTotalPrice()}
                  />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <PriceFormatter
                    amount={getTotalPrice()}
                    className="text-lg font-bold text-black"
                  />
                </div>
                <Button
                onClick={handleCheckout}
                  className="w-full rounded-full font-semibold tracking-wide"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                <Link
                  href={"/"}
                  className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:bg- hoverEffect"
                >
                  <Image src={paypalLogo} alt="PayPal" className="w-20" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

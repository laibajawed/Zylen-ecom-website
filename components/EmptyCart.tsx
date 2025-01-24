"use client";
import emptyCart from "../images/Empty-cart-1-512.webp";
import Image from "next/image";
import { motion } from "motion/react";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="py-10 md:py-20 bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 h-48 mx-auto relative"
        >
          <Image
            src={emptyCart}
            alt="emptyCart"
            className="drop-shadow-lg object-contain "
          />
          <motion.div
            animate={{ x: [0, -10, 10, 0], y: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 bg-blue-500 rounded-full"
          >
            <ShoppingCartIcon size={24} className="text-white" />
          </motion.div>
        </motion.div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 ">
            Your cart is feeling lonely
          </h2>
          <p className="text-gray-600">
            It looks like you haven&apos;t added anything to your cart.
            Let&apos;s add some items!
          </p>
        </div>
        <Link
          href={"/"}
          className="block bg-darkColor/5 border border-darkColor/20 text-center py-2.5 rounded-full text-sm font-semibold tracking-wide hover:border-darkColor hover:bg-darkColor hover:text-white hoverEffect"
        >
          Discover Products
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyCart;

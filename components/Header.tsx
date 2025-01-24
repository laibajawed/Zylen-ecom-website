import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { getAllCategories } from "@/sanity/helpers/query";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

const Header = async () => {
  const user =await currentUser()
 const categories = await getAllCategories()
  return (
    <header className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white">
      <Container className="flex items-center justify-between gap-7 text-lightColor">
        <HeaderMenu categories={categories} />
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu />
          <Logo>Zylen</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />

        {!user && (
          <SignInButton mode="modal">
              <button className="text-sm font-semibold hover:text-darkColor hoverEffect">
            Login
          </button>
          </SignInButton>
        )}
        </div>
      </Container>
    </header>
  );
};

export default Header;

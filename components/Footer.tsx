import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { Input } from "./ui/input";
import { categoriesData, quickLinksData } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer>
        <Container className="bg-white border-">
          <FooterTop />
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo>Zylen</Logo>
              <p className="text-gray-600 text-sm">
              Zylen is a cutting-edge technology company dedicated to providing innovative solutions for modern businesses.
              </p>
              <SocialMedia
                className="text-darkColor/60  "
                iconClassName="border-darkColor/60 hover:border-darkColor hover:text-darkColor"
                tooltipClassName="bg-darkColor text-white"
              />
            </div>
            <div>
              <h3 className="font-semibold text-darkColor mb-4">Quick Links</h3>
              <div className={"flex flex-col gap-3"}>
                {quickLinksData?.map((item) => (
                  <Link
                    key={item?.title}
                    href={item?.href}
                    className="text-gray-600 text-sm hover:text-darkColor hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-darkColor mb-4">Categories</h3>
              <div className={"flex flex-col gap-3"}>
                {categoriesData?.map((item) => (
                  <Link
                    key={item?.title}
                    href={`/category${item?.href}`}
                    className="text-gray-600 text-sm  font-medium hover:text-darkColor hoverEffect"
                  >
                    {item?.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-darkColor mb-4 ">NewsLetter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Subscribe to our newsletter to recieve updates and exclusive
                offers
              </p>
              <form className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <button
                  type="submit"
                  className="w-full bg-darkColor  rounded-lg hover:bg-gray-800 text-white mt-4 px-4 py-3 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;

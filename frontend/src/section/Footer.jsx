import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0A2540] font-inter py-8 px-4">
      <div className="flex flex-row justify-between flex-wrap gap-6 pb-6 md:pb-8 md:px-6 border-b border-gray-400">
        <ul className="text-gray-400 space-y-1 flex-wrap shrink-0">
          <li>
            <h2 className="font-bold mb-2 text-white">Shop</h2>
          </li>
          <li>All Printers</li>
          <li>Deals</li>
          <li>HP</li>
          <li>Canon</li>
        </ul>
        <ul className="text-gray-400 flex-wrap shrink-0 space-y-1">
          <li>
            <h2 className="font-bold mb-2 text-white">About</h2>
          </li>
          <li>Our Story</li>
          <li>Why Second-hand?</li>
          <li>Contact Us</li>
        </ul>
        <ul className="text-gray-400 flex-wrap shrink-0 space-y-1">
          <li>
            <h2 className="font-bold mb-2 text-white">Support</h2>
          </li>
          <li>FAQ</li>
          <li>warranty</li>
          <li>Shipping & Return</li>
        </ul>
        <div className="">
          <h2 className="font-bold mb-1 text-white text-lg">
            Get EXCLUSIVE DEALS
          </h2>
          <p className="text-gray-300 mb-2 w-10/12">
            Sign up for our newsletter to get the best deals first
          </p>
          <div className="flex  mt-4 w-10/12">
            <Input
              placeholder="Enter your email"
              className="focus-visible:ring-0 bg-white rounded-sm rounded-br-none rounded-tr-none outline-none"
            />
            <button className="bg-gradient-to-r from-[#18D2B4] to-[#7F5AF0] text-white w-12 flex justify-center items-center rounded-br-md rounded-tr-md  cursor-pointer">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <p className="pt-6 text-center text-gray-200">
        &copy; 2025 Printerly. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

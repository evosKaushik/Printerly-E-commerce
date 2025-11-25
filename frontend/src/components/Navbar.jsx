import React from "react";
import { Input } from "./ui/input";
import { Heart, Menu, Search, User2 } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-18 border shadow bg-(--bg-primary-clr) sticky top-0 left-0 right-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-2">
        <div className="flex items-center gap-1 h-full grow">
          <Link to="/">
            <div className="flex items-end gap-2">
              <div className="w-6 h-6 sm:h-8 sm:w-8">
                <img src="./logo.png" alt="Printerly Logo" />
              </div>
              <h2 className="text-[1rem] sm:text-2xl font-bold tracking-tight font-inter">
                Printerly
              </h2>
            </div>
          </Link>
          {/* SearchBox Parent Div */}

          <div className="w-1/2 relative ml-2 sm:ml-8">
            <div className="flex items-center bg-gray-200 dark:bg-gray-800 px-4 rounded-full">
              <Search className="cursor-pointer" />
              <Input
                type="text"
                placeholder="Search"
                className="border-0 shadow-none outline-0 focus-visible:border-0 focus-visible:ring-0 bg-gray-200 dark:bg-gray-800 font-[550] text-[16px] placeholder:text-[16px]"
              />
            </div>
            {/* Search Suggestion Div */}
            <div className="absolute right-0 h-24 bg-rose-300 w-11/12 mr-3 mt-1 hidden">
              Hi
            </div>
          </div>
        </div>
        <div className="flex gap-6 items-center h-full ">
          <ul className="hidden lg:flex items-center  space-x-5 2xl:space-x-8 lg:text-lg font-inter font-semibold mr-3 h-full text-nowrap [&>*]:cursor-pointer">
            <li>Printer</li>
            <li>Deals</li>
            <li>Support</li>
            <li>About Us</li>
          </ul>
          <div className="gap-6 hidden sm:flex">
            <div className="bg-gray-200 dark:dark:bg-gray-800 h-9 flex items-center justify-center w-9 rounded-md cursor-pointer">
              <User2 />
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>
          {/* Sub Menu icon*/}
          <div className="bg-gray-200 dark:dark:bg-gray-800 h-9 flex lg:hidden items-center justify-center w-9 rounded-md cursor-pointer stroke-3">
            <Menu className="stroke-2" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

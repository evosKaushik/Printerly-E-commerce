import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { FrownIcon, Menu, Search, User2 } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const searchArry = [
  "HTML",
  "CSS",
  "Javascript",
  "Tailwind CSS",
  "Git & Github",
  "NPM",
  "React",
  "GSAP",
  "REDUX",
  "TypeScript",
  "Next JS",
];

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchBoxRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSearchValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let filteredSearch = searchArry.filter((value) =>
    value.toLowerCase().includes(searchValue)
  );

  return (
    <nav
      className="h-18 border shadow bg-(--bg-primary-clr) sticky top-0 left-0 right-0 z-50"
      ref={searchBoxRef}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-2">
        <div className="flex items-center gap-1 h-full grow">
          <Link to="/">
            <div className="flex items-end gap-2">
              <div className="w-8 h-8">
                <img src="./logo.png" alt="Printerly Logo" />
              </div>
              <h2 className="hidden xs:block text-lg sm:text-xl font-bold tracking-tight font-inter">
                Printerly
              </h2>
            </div>
          </Link>
          {/* SearchBox Parent Div */}

          <div className="w-10/12  xs:w-1/2 relative ml-2 sm:ml-8">
            <div className="flex items-center bg-gray-200 dark:bg-gray-800 px-4 rounded-full border border-gray-400 dark:border-gray-600">
              <Search className="cursor-pointer" />
              <Input
                onChange={(e) => {
                  setSearchValue(e.target.value.toLowerCase());
                }}
                type="text"
                placeholder="Search"
                className="border-0 shadow-none outline-0 focus-visible:border-0 focus-visible:ring-0 bg-gray-200 dark:bg-gray-800 font-[550] text-[16px] placeholder:text-[16px]"
              />
            </div>
            {/* Search Suggestion Div */}
            {searchValue && (
              <div className="absolute right-0 bg-gray-300 dark:bg-gray-800 w-11/12 mr-3 mt-1 p-2 rounded-md">
                {!filteredSearch.length ? (
                  <div className="flex gap-2 items-center text-red-700">
                    <FrownIcon className="" />{" "}
                    <span className="text-lg">Not Found</span>
                  </div>
                ) : (
                  filteredSearch.map((value, index) => {
                    return (
                      <p
                        key={index}
                        className="py-2 px-1 border-b border-zinc-600 cursor-pointer"
                      >
                        {value}
                      </p>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-6 items-center h-full ">
          <ul className="hidden lg:flex items-center  space-x-5 2xl:space-x-8 font-inter font-semibold mr-3 h-full text-nowrap [&>*]:cursor-pointer">
            <li>
              <NavLink to="/products">Printer</NavLink>
            </li>
            <li>
              <NavLink to="/products">Ink & Toner</NavLink>
            </li>
            <li>
              <NavLink to="/deals">Deals</NavLink>
            </li>
            <li>
              <NavLink to="support">Support</NavLink>
            </li>
            <li>
              <NavLink to="about-us">About Us</NavLink>
            </li>
          </ul>
          <div className="gap-6 flex">
            {!localStorage.getItem("accessToken") ? (
              <div className="hidden md:flex gap-4">
                <Button className="bg-gray-100 border border-gray-300 shadow-sm text-primary cursor-pointer  text-lg font-inter font-bold dark:bg-gray-700 dark:text-(--secondary-clr)/90 dark:border-gray-500 ">
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button
                  variant="primary"
                  className="text-primary cursor-pointer text-lg font-inter font-bold dark:text-[#101F22]/90"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            ) : (
              <div className="bg-gray-200  dark:dark:bg-gray-800 h-9 flex items-center justify-center w-9 rounded-md cursor-pointer">
                <Link to="/profile">
                  <User2 />
                </Link>
              </div>
            )}
            <div className="hidden sm:block">
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

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="bg-(--bg-primary-clr)  min-h-[calc(100vh-72px)] w-full flex justify-center items-center flex-col font-inter gap-2">
        <InfoIcon className="h-28 w-28 text-(--secondary-clr) "/>
        <h1 className="text-4xl font-extrabold  sm:text-7xl text-primary dark:text-white">404</h1>
        <h2 className="text-3xl font-bold sm:text-4xl text-primary dark:text-white">Page Not Found</h2>
        <p className="text-sm w-10/12 md:w-1/3 md:text-lg text-center md:leading-6 text-gray-600 dark:text-gray-200">
          Oops! We can't seem to find the page you're looking for. The link
          might be broken or the page may have been moved.
        </p>
        <div className="mt-4 flex gap-6 flex-wrap justify-center">
            <Button variant="primary" className="text-lg p-6 font-bold dark:text-zinc-900">
                <Link to="/">Return to HomePage</Link>
            </Button>
            <Button className="bg-gray-200 text-lg p-6 font-bold text-primary hover:bg-gray-300 dark:bg-gray-800">
                <Link to="/support">Contact Support</Link>
            </Button>
        </div>

      </main>
    </>
  );
};

export default NotFound;

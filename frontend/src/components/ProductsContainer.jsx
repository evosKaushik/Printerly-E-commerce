import { ChevronLeft, ChevronRight, LayoutGridIcon, LayoutList } from "lucide-react";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";


const ProductsContainer = () => {
  const [gridLayoutActive, setGridLayoutActive] = useState(true);
  const handleLayout = () => {
    setGridLayoutActive(!gridLayoutActive);
  };
  return (
    <div className="h-full relative ">
      <header className="flex justify-between px-4 h-12">
        <h2 className="text-[16px] font-inter text-gray-700 mt-auto ">
          Showing <span>24</span> of <span>128</span> result
        </h2>
        <div className="flex bg-gray-200 dark:bg-gray-600 h-full justify-center w-24 rounded-lg gap-2 px-2 py-1">
          <div
            className={`${gridLayoutActive ? "bg-white dark:bg-gray-300" : ""} h-full align-middle grow rounded-sm cursor-pointer transition-all duration-500`}
            onClick={handleLayout}
          >
            <LayoutGridIcon className="h-full align-middle mx-auto dark:text-gray-900" />
          </div>
          <div
            className={`${!gridLayoutActive ? "bg-white dark:bg-gray-300" : ""} h-full grow rounded-sm cursor-pointer transition-all duration-500`}
            onClick={handleLayout}
          >
            <LayoutList className="h-full align-middle mx-auto dark:text-gray-900" />
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-6 pb-16">
        {Array.from({ length: 10 }).map((el, index) => {
          return (
            <Card key={index} className="py-1 px-2 -space-y-6 ">
              <img src="unnamed.png" alt="printer"/>
              <div className="px-2">
                <h2>HP LaserJet Pro M404n</h2>
                <p>$159.99</p>
                <p>Condition: Like New</p>
              </div>
            </Card>
          );
        })}
      </div>
        <div className="absolute bottom-0 mx-auto left-1/2 -translate-1/2">
            <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant="ghost" asChild>
            <Link to="#">
              <ChevronLeft className="rtl:rotate-180" /> Preview
            </Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant="outline" mode="icon" asChild>
            <Link to="#">1</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant="ghost" mode="icon" asChild>
            <Link to="#">2</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant="ghost" mode="icon" asChild>
            <Link to="#">3</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button variant="ghost" asChild>
            <Link to="#">
              Next <ChevronRight className="rtl:rotate-180" />
            </Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
        </div>
    </div>
  );
};

export default ProductsContainer;

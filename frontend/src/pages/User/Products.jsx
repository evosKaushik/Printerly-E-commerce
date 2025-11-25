import ProductsContainer from "@/components/ProductsContainer";
import SideBar from "@/components/SideBar";
import React from "react";

const Products = () => {
  return (
    <main className="bg-(--bg-primary-clr)  w-full min-h-[calc(100vh-72px)] py-8">
      <section className="container mx-auto px-4 sm:px-0">
        <div>
          <h3 className="sm:text-lg flex gap-2 sm:gap-4 font-medium ">
            <span>Home</span> / <span>Products</span>
          </h3>
        </div>
        <div className="grid sm:grid-cols-[250px_1fr] md:grid-cols-[300px_1fr] gap-4 mt-4 sm:mt-6">
          <SideBar />
          <ProductsContainer />
        </div>
      </section>
    </main>
  );
};

export default Products;

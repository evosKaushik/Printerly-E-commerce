import ProductsContainer from "@/section/Products/ProductsContainer";
import FilterSideBar from "@/components/FilterSidebar";
import React from "react";

const brands = ["HP", "Canon", "Brother", "Epson"];
const conditions = ["Like New", "Good", "Fair"];

const selectFilterItems = [
  "Newest Arrival",
  "Best Selling",
  "Highest Rated",
  "Trending Now",
  "Discount: High to Low",
];

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
          <FilterSideBar  
          selectFilterItems={selectFilterItems}
          checkBoxItems={brands}
          conditionsCheckBox={conditions}
          />
          <ProductsContainer />
        </div>
      </section>
    </main>
  );
};

export default Products;

import { Link } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const ProductsContainer = ({
  productList = [],
  loading,
  totalProductCount,
}) => {
  return (
    <div className="h-full relative">
      <header className="flex justify-between items-center px-4 h-12">
        <h2 className="text-[16px] font-inter text-gray-700 dark:text-zinc-200">
          Showing <span className="font-semibold">{productList.length}</span> of{" "}
          <span>{totalProductCount}</span> results
        </h2>
      </header>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 p-6 pb-16">
        {loading
          ? // 🟡 Loading skeletons
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-background h-72 p-2 space-y-2.5 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <Skeleton className="w-full h-[60%] bg-ring/50" />
                <Skeleton className="w-full h-6 bg-ring/70 mt-4" />
                <Skeleton className="w-full h-5 bg-ring/70 mt-4" />
                <Skeleton className="w-full h-5 bg-ring/70" />
              </div>
            ))
          : // 🟢 Actual Product Cards
            productList.map((product) => {
              const stock = product.stock || 0;
              const lowStock = stock < 10;

              return (
                <Card
                  key={product._id}
                  className="relative overflow-hidden rounded-xl border border-gray-200  dark:border-gray-600 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-3 flex flex-col"
                >
                  <Link to={product._id}>
                    {/* Stock badge */}
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10 ${
                        lowStock
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          lowStock ? "bg-red-600" : "bg-green-600"
                        }`}
                      ></span>
                      {lowStock ? `Only ${stock} left` : "In Stock"}
                    </div>

                    {/* Product Image */}
                    <div className="h-48 flex justify-center items-center mb-3 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={product?.thumbnail?.url}
                        alt={product?.productName}
                        className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col px-2 font-inter">
                      <h2 className="font-bold text-gray-800 dark:text-gray-200 text-lg truncate">
                        {product?.productName}
                      </h2>
                      {product?.discountPrice ? (
                        <div className="flex items-center gap-4">
                          <p className="text-xl font-bold text-primary dark:text-gray-300">
                            ₹{product?.discountPrice.toLocaleString("en-IN")}
                          </p>
                          <p className="line-through dark:text-gray-400 ">
                            ₹{product?.productPrice?.toLocaleString("en-IN")}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-400  font-semibold mt-1">
                          ₹{product?.productPrice?.toLocaleString("en-IN")}
                        </p>
                      )}

                      <p className="text-gray-400 text-sm mt-1">
                        Condition: {product?.condition || "Like New"}
                      </p>
                    </div>
                  </Link>
                  <Button variant="primary" className="-mt-4 w-10/12 mx-auto font-inter text-[16px] flex justify-center items-center dark:text-black/70 ">
                    <ShoppingCart /> <span>Add to Cart</span>
                  </Button>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default ProductsContainer;

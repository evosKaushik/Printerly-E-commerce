import ProductsContainer from "@/section/Products/ProductsContainer";
import FilterSideBar from "@/components/FilterSidebar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BaseAPI from "@/api/Base.api";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { products } = useSelector((store) => store.product);
  const [brandFilter, setBrandFilter] = useState("All");
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [conditionsFilter, setConditionsFilter] = useState("All");
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await BaseAPI("/product/get-all-product");
        if (data.success) {
          setLoading(false);
          setAllProducts(data.products);
          setTotalProductCount(data.products?.length);
          dispatch(setProducts(data.products));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filteredProducts = [...allProducts];

    if (brandFilter !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.toLowerCase() === brandFilter.toLowerCase()
      );
    }
    if (conditionsFilter !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.condition.toLowerCase() === conditionsFilter.toLowerCase()
      );
    }

    dispatch(setProducts(filteredProducts));
  }, [brandFilter, conditionsFilter, dispatch, allProducts]);
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
            allProducts={allProducts}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            conditionsFilter={conditionsFilter}
            setConditionsFilter={setConditionsFilter}
          />
          <ProductsContainer productList={products} loading={loading} totalProductCount={totalProductCount}/>
        </div>
      </section>
    </main>
  );
};

export default Products;

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const selectFilterItems = [
  "Newest Arrival",
  "Best Selling",
  "Highest Rated",
  "Trending Now",
  "Discount: High to Low",
];

const FilterSideBar = ({
  allProducts,
  brandFilter,
  setBrandFilter,
  setConditionsFilter,
  conditionsFilter,
}) => {
  const category = allProducts.map((product) => product.category);
  const categories = ["All", ...category];
  const brand = allProducts.map((product) => product.brand);
  const brands = ["All", ...new Set(brand)];
  const condition = allProducts.map((product) => product.condition);
  const conditions = ["All", ...new Set(condition)];

  const handleBrandFilter = (e) => {
    setBrandFilter(e.target.value);
  };
  const handleConditionsFilter = (e) => {
    setConditionsFilter(e.target.value);
  };

  const handleReset = () =>{
    setConditionsFilter("All")
    setBrandFilter("All")
  }

  return (
    <aside className="hidden sm:block">
      <h1 className="text-2xl font-inter font-bold">Filter</h1>
      <p className="mt-2 text-gray-500 font-inter">
        Find the perfect printer for your needs.
      </p>
      <div className="space-y-6">
        {/* Sort By Selector */}
        <Card className="mt-6  p-4  rounded-lg shadow-sm">
          <h2 className="md:text-lg font-inter font-bold">Sort By</h2>
          <Select>
            <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-800 -mt-2 border border-gray-300 dark:border-gray-700 rounded-md text-[16px] font-inter font-medium">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectFilterItems.map((item, index) => (
                  <SelectItem
                    key={item + index}
                    value={item}
                    className="text-[16px] font-inter"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Card>
        {/* Brand CheckBox */}
        <Card className="-space-y-3 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold font-inter">Brand</h2>
          <div className="space-y-2">
            {brands.map((brandName, index) => (
              <div
                className="flex items-center gap-4 font-inter"
                key={brandName + index}
              >
                <Checkbox
                  id={brandName}
                  className="h-5 w-5 cursor-pointer rounded-sm border-gray-900 dark:border-gray-100 dark:bg-gray-800"
                  value={brandName}
                  checked={
                    brandFilter.toLowerCase() === brandName.toLowerCase()
                  }
                  onClick={handleBrandFilter}
                />
                <Label
                  htmlFor={brandName}
                  className="text-[16px] cursor-pointer text-gray-800 dark:text-gray-200"
                >
                  {brandName}
                </Label>
              </div>
            ))}
          </div>
        </Card>
        {/* Condition CheckBox */}
        <Card className="-space-y-3 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold font-inter">Condition</h2>

          {conditions.map((condition, index) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={index}
                checked={
                  conditionsFilter.toLowerCase() === condition?.toLowerCase()
                }
                value={condition}
                onClick={handleConditionsFilter}
                className="h-5 w-5 cursor-pointer rounded-sm border-gray-900 dark:border-gray-100 dark:bg-gray-800"
              />
              <Label
                htmlFor={index}
                className="font-inter text-[16px] font-semibold cursor-pointer text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                {condition}
              </Label>
            </div>
          ))}
        </Card>
        {/* Apply Filter */}
        <div className="flex w-10/12 mx-auto px-2 gap-4">
          <Button
            variant="primary"
            className="font-bold dark:text-zinc-900 grow cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSideBar;

import { useState } from "react";
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

const SideBar = () => {
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("Brother");

  const brands = ["HP", "Canon", "Brother", "Epson"];
  const conditions = ["Like New", "Good", "Fair"];

  const selectFilterItems = [
    "Newest Arrival",
    "Best Selling",
    "Highest Rated",
    "Trending Now",
    "Discount: High to Low",
  ];
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
            {brands.map((brand, index) => (
              <div
                className="flex items-center gap-4 font-inter"
                key={brand + index}
              >
                <Checkbox
                  id={brand}
                  className="h-5 w-5 cursor-pointer rounded-sm border-gray-900 dark:border-gray-100 dark:bg-gray-800"
                />
                <Label
                  htmlFor={brand}
                  className="text-[16px] cursor-pointer text-gray-800 dark:text-gray-200"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </Card>
        {/* Condition CheckBox */}
        <Card className="-space-y-3 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold font-inter">Condition</h2>

          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={condition}
                checked={selectedCondition === condition}
                onCheckedChange={() => setSelectedCondition(condition)}
                className="h-5 w-5 cursor-pointer rounded-sm border-gray-900 dark:border-gray-100 dark:bg-gray-800"
              />
              <Label
                htmlFor={condition}
                className="font-inter text-[16px] font-semibold cursor-pointer text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                {condition}
              </Label>
            </div>
          ))}
        </Card>
        {/* Apply Filter */}
        <div className="flex w-full px-2 gap-4">
          <Button
            variant="primary"
            className="font-bold dark:text-zinc-900 grow cursor-pointer"
          >
            Apply Filter
          </Button>
          <Button className="bg-gray-200  font-bold text-primary hover:bg-gray-300 dark:bg-gray-800 grow cursor-pointer">
            Reset
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

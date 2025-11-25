import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LeafIcon, TruckElectric, Verified } from "lucide-react";
import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-(--bg-primary-clr) py-16">
      <div className="container mx-auto px-2 sm:px-4">
        <h1 className="text-2xl sm:text-4xl font-inter font-bold mb-4">
          Shop with Confidence
        </h1>
        <p className="w-11/12 text-gray-600 sm:text-lg sm:leading-5 dark:text-gray-300 mb-6 md:w-8/12 ">
          Every printer we sell is rigorously tested to ensure it meets our
          quality standards for quality and performance. We stand behind our
          products so you can print worry-free.
        </p>
        <div className=" grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
          <Card>
            <CardHeader>
              <Verified className="text-[#18D2B4] h-9 w-9" />
            </CardHeader>
            <CardContent>
              <h1 className="text-xl  -mt-4 font-bold font-inter ">
                Quality Tested
              </h1>
              <p className="text-gray-600 font-inter dark:text-gray-300">
                All our printers pass a 20-point inspection and come with a
                90-day warranty
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <LeafIcon className="text-[#18D2B4] h-9 w-9" />
            </CardHeader>
            <CardContent>
              <h1 className="text-xl  -mt-4 font-bold font-inter ">
                Eco-Friendly Choice
              </h1>
              <p className="text-gray-600 font-inter dark:text-gray-300">
                Choosing a pre-owned printer helps reduce e-waste and supports
                sustainability
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <TruckElectric className="text-[#18D2B4] h-9 w-9" />
            </CardHeader>
            <CardContent>
              <h1 className="text-xl  -mt-4 font-bold font-inter ">
                Fast Shipping
              </h1>
              <p className="text-gray-600 font-inter dark:text-gray-300">
                Get your printer quickly with our reliable and speedy delivery
                network.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

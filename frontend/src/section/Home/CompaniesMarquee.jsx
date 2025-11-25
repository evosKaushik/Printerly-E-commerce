import { Marquee } from "@/components/ui/marquee";
import React from "react";

const CompaniesImages = [
  {
    id: "image1",
    src: "images/companies/brother.png",
    alt: "Brother",
  },
  {
    id: "image2",
    src: "images/companies/canon.png",
    alt: "Canon",
  },
  {
    id: "image3",
    src: "images/companies/epson.png",
    alt: "epson",
  },
  {
    id: "image4",
    src: "images/companies/hp.png",
    alt: "HP",
  },
];

const CompaniesMarquee = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 sm:py-12 space-y-3 sm:space-y-6">
        <h1 className="text-xl sm:text-3xl font-inter font-semibold">Trusted Brand you know and love</h1>
      <Marquee pauseOnHover className="[--duration:20s]">
        {CompaniesImages.map(({ id, src, alt }) => (
          <img
            key={id}
            src={src}
            alt={alt}
            className="mx-10 h-12 rounded-sm sm:h-16 w-auto hover:scale-120 transition-transform duration-500 cursor-pointer"
          />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {CompaniesImages.map(({ id, src, alt }) => (
          <img
            key={id}
            src={src}
            alt={alt}
            className="mx-10 h-12 sm:h-16 rounded-sm w-auto hover:scale-120 transition-transform duration-500 cursor-pointer"
          />
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
};

export default CompaniesMarquee;

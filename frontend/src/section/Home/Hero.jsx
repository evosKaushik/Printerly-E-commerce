import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Card, CardContent } from "../../components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { GridBackground } from "@/components/ui/grid-background";

const Hero = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  return (
    <section
      id="hero"
      className="bg-(--bg-primary-clr)  w-full min-h-[calc(100vh-72px)] flex "
    >
          <div className="relative flex items-center justify-center w-full rounded-xl overflow-hidden">
      <GridBackground gridSize="12:12" beams={24}>

 
      <div className="container mx-auto flex   items-center flex-col sm:flex-row">
        {/* Left Side Content */}
        <div className="flex justify-center w-auto items-start flex-col  gap-4  max-sm:mt-12">
          <h1 className="text-4xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold max-sm:pl-6 font-inter lg:leading-16 2xl:leading-18 grow-0">
            Pre-Owned
            <br /> Printers.Like New,
            <br />
            For Less.
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg w-10/12 grow-0 max-sm:text-center">
            Find the perfect printer for your home or office, fully tested and
            backed by warranty.
          </p>
          <div className="flex justify-center lg:justify-start max-sm:w-full">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gradient-to-r from-[#18D2B4] to-[#7F5AF0] text-white text-base font-bold leading-normal tracking-wide shadow-lg hover:shadow-xl transition-shadow">
              <span className="truncate">Shop All Printers</span>
            </button>
          </div>
        </div>
        {/* Carousel Of Printers */}
        <div className="grow h-full flex justify-center items-center lg:mr-12 w-11/12 lg:w-auto mr-12 md:mr-8 max-sm:mt-8 max-sm:mr-0 xl:ml-18">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-80  md:max-w-96 lg:max-w-lg 2xl:max-w-7xl max-sm:max-w-10/12 xl:max-w-4xl"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-video  items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious size="icon-lg" className="max-sm:hidden" />
            <CarouselNext className="max-sm:hidden" />
          </Carousel>
        </div>
      </div>
           </GridBackground>
    </div>
    </section>
  );
};

export default Hero;

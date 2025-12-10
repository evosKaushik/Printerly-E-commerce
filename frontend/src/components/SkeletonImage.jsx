import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // <-- from shadcn

const SkeletonImage = ({
  src,
  alt,
  className = "",
  skeletonClass = "",
  rounded = "rounded-md",
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${rounded}`}>
      {/* Skeleton Loader */}
      {!loaded && (
        <Skeleton className={`absolute inset-0 bg-gray-600 dark:bg-gray-200 ${skeletonClass} ${rounded}`} />
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        className={`${className} ${rounded}  transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default SkeletonImage;

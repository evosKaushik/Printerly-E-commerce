"use client";
import React from "react";

const LazyLoader = () => {
  return (
    <div id="lazyLoaderContainer">
      <div className="loader">
        {" "}
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default LazyLoader;

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function SkeletonComponent({ cards }) {
  return Array.from({ length: cards }, (_, index) => (
    <div key={index} className="w-[375px] mb-4">
      <div>
        <Skeleton className="rounded-xl  h-[225px]" />
      </div>
      <div className="flex mt-2">
        <div className="w-1/6">
          <Skeleton className="rounded-full h-10 w-10" />
        </div>
        <div className="w-5/6 pr-4">
          <div className="text-lg leading-6 text-gray-300">
            <Skeleton />
          </div>
          <Skeleton />
        </div>
      </div>
    </div>
  ));
}

export default SkeletonComponent;
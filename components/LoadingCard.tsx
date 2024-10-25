import React from "react";
import { Skeleton } from "./ui/skeleton";
import Each from "./common/Each";

export default function LoadingCard() {
  return (
    <div className=" grid xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-6">
      <Each
        of={Array.from({ length: 4 })}
        render={() => (
          <div className="flex flex-col space-y-3  justify-center min-h-screen  items-start">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <div className="space-y-2 ">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
      />
    </div>
  );
}
